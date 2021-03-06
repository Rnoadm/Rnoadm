package main

import (
	"golang.org/x/net/websocket"
	"github.com/Rnoadm/Rnoadm-Legacy/hero"
	"github.com/Rnoadm/Rnoadm-Legacy/material"
	"github.com/Rnoadm/Rnoadm-Legacy/world"
	"io"
	"log"
	"math/big"
	"net"
	"strings"
	"time"
)

type clientPacket struct {
	Admin []string
	Auth  *hero.LoginPacket
	Walk  *struct {
		X, Y uint8
	}
	HUD *struct {
		Name string      `json:"N"`
		Data interface{} `json:"D"`
	}
	Chat  *string
	Mouse *struct {
		X, Y, Fx, Fy uint8
	}
	Interact *struct {
		ID     uint64 `json:",string"`
		X, Y   uint8
		Action string
	}
}

type packetKick struct {
	Kick string
}

var packetClientHash struct {
	ClientHash string
}

type packetUpdate struct {
	Update           []packetUpdateUpdate
	PlayerX, PlayerY uint8
}

type packetUpdateUpdate struct {
	ID     uint64              `json:"I,string"`
	X      uint8               `json:"X"`
	Y      uint8               `json:"Y"`
	FromX  *uint8              `json:"Fx,omitempty"`
	FromY  *uint8              `json:"Fy,omitempty"`
	Remove bool                `json:"R,omitempty"`
	Object *packetUpdateObject `json:"O,omitempty"`
}

type packetUpdateObject struct {
	Name    string               `json:"N"`
	Sprites []packetUpdateSprite `json:"S"`
	Actions []string             `json:"A"`
	Health  *[2]uint64           `json:"H"`
}

type packetUpdateSprite struct {
	Sheet string                 `json:"S"`
	Color string                 `json:"C"`
	Extra map[string]interface{} `json:"E,omitempty"`
}

type packetInventoryItem struct {
	ID     uint64              `json:"I,string"`
	Object *packetUpdateObject `json:"O"`
}

type packetInventory struct {
	Inventory []*packetInventoryItem
}

type packetMessage struct {
	Message []hero.Message `json:"Msg"`
}

type packetFloatingTextText struct {
	X, Y  uint8
	Text  string `json:"T"`
	Color string `json:"C"`
}

type packetFloatingText struct {
	FloatingText packetFloatingTextText `json:"Ftxt"`
}

func addSprites(u *packetUpdateObject, obj world.Visible) *packetUpdateObject {
	sheet := obj.Sprite()
	x, y := obj.SpritePos()
	width, height := obj.SpriteSize()
	scale := obj.Scale()
	animation := obj.AnimationType()
	for i, c := range obj.Colors() {
		if c == "" {
			continue
		}
		u.Sprites = append(u.Sprites, packetUpdateSprite{
			Sheet: sheet,
			Color: c,
			Extra: map[string]interface{}{
				"w": width,
				"h": height,
				"x": x,
				"y": y + uint(i),
				"s": scale,
				"a": animation,
			},
		})
	}
	for _, a := range obj.Attached() {
		addSprites(u, a)
	}
	return u
}

type packetHUD struct {
	HUD hero.HUD
}

func socketHandler(ws *websocket.Conn) {
	defer ws.Close()

	addr, _, err := net.SplitHostPort(ws.Request().RemoteAddr)
	if err != nil {
		panic(err)
	}

	packets := make(chan clientPacket)
	go func() {
		defer close(packets)
		for {
			var packet clientPacket
			if err := websocket.JSON.Receive(ws, &packet); err != nil {
				if err == io.EOF {
					return
				}
				if _, ok := err.(*net.OpError); ok {
					return
				}
				log.Printf("%s: %T %v", addr, err, err)
				return
			}
			packets <- packet
		}
	}()

	err = websocket.JSON.Send(ws, packetClientHash)
	if err != nil {
		if err != io.EOF {
			log.Printf("[err_sock] %s:%#v %v", addr, packetClientHash, err)
		}
		return
	}

	var (
		player      *hero.Player
		zone        *world.Zone
		kick        <-chan string
		hud         <-chan hero.HUD
		inventory   <-chan []world.Visible
		messages    <-chan []hero.Message
		updateQueue packetUpdate
	)
	updateTick := time.NewTicker(time.Second / 10)
	defer updateTick.Stop()
	updates := make(chan []packetUpdateUpdate, 1)
	floatingText := make(chan packetFloatingText, 32)

	sendUpdates := func(newUpdates ...packetUpdateUpdate) {
		for {
			select {
			case updates <- newUpdates:
				return
			case other := <-updates:
				newUpdates = append(other, newUpdates...)
			}
		}
	}
	var listener *world.ZoneListener
	updateWalls := func(t *world.Tile, obj world.ObjectLike) {
		if _, ok := obj.(material.IsWall); ok {
			x, y := t.Position()
			if x > 0 {
				tile := t.Zone().Tile(x-1, y)
				for _, w := range tile.Objects() {
					if _, ok := w.(material.IsWall); ok {
						listener.Update(tile, w)
					}
				}
			}
			if x < 255 {
				tile := t.Zone().Tile(x+1, y)
				for _, w := range tile.Objects() {
					if _, ok := w.(material.IsWall); ok {
						listener.Update(tile, w)
					}
				}
			}
			if y > 0 {
				tile := t.Zone().Tile(x, y-1)
				for _, w := range tile.Objects() {
					if _, ok := w.(material.IsWall); ok {
						listener.Update(tile, w)
					}
				}
			}
			if y < 255 {
				tile := t.Zone().Tile(x, y+1)
				for _, w := range tile.Objects() {
					if _, ok := w.(material.IsWall); ok {
						listener.Update(tile, w)
					}
				}
			}
		}
	}
	toObject := func(o world.Visible) *packetUpdateObject {
		var health *[2]uint64
		if c, ok := o.(world.Combat); ok {
			h, m := c.Health(), c.MaxHealth()
			if l := m.BitLen(); l > 64 {
				h = (&big.Int{}).Rsh(h, uint(l-64))
				m = (&big.Int{}).Rsh(m, uint(l-64))
			}
			health = &[2]uint64{h.Uint64(), m.Uint64()}
		}
		return addSprites(&packetUpdateObject{
			Name:    o.Name(),
			Actions: o.Actions(player),
			Health:  health,
		}, o)
	}
	listener = &world.ZoneListener{
		Add: func(t *world.Tile, obj world.ObjectLike) {
			o, ok := obj.(world.Visible)
			if !ok {
				return
			}
			x, y := t.Position()
			sendUpdates(packetUpdateUpdate{
				ID:     o.NetworkID(),
				X:      x,
				Y:      y,
				Object: toObject(o),
			})
			updateWalls(t, obj)
		},
		Remove: func(t *world.Tile, obj world.ObjectLike) {
			o, ok := obj.(world.Visible)
			if !ok {
				return
			}
			x, y := t.Position()
			sendUpdates(packetUpdateUpdate{
				ID:     o.NetworkID(),
				X:      x,
				Y:      y,
				Remove: true,
			})
			updateWalls(t, obj)
		},
		Move: func(from, to *world.Tile, obj world.ObjectLike) {
			o, ok := obj.(world.Visible)
			if !ok {
				return
			}
			fx, fy := from.Position()
			tx, ty := to.Position()
			sendUpdates(packetUpdateUpdate{
				ID:    o.NetworkID(),
				X:     tx,
				Y:     ty,
				FromX: &fx,
				FromY: &fy,
			})
			updateWalls(from, obj)
			updateWalls(to, obj)
		},
		Update: func(t *world.Tile, obj world.ObjectLike) {
			o, ok := obj.(world.Visible)
			if !ok {
				return
			}
			x, y := t.Position()
			sendUpdates(packetUpdateUpdate{
				ID:     o.NetworkID(),
				X:      x,
				Y:      y,
				Object: toObject(o),
			})
		},
		Damage: func(attacker, victim world.Combat, amount *big.Int) {
			t := victim.Position()
			if t == nil {
				return
			}
			x, y := t.Position()
			sendUpdates(packetUpdateUpdate{
				ID:     victim.NetworkID(),
				X:      x,
				Y:      y,
				Object: toObject(victim),
			})
			text := packetFloatingTextText{
				X:     x,
				Y:     y,
				Color: "#fff",
			}
			if amount == world.DamageMissed {
				text.Text = "MISS"
			} else if amount == world.DamageBlocked {
				text.Text = "BLOCK"
			} else if amount == world.DamageResisted {
				text.Text = "RESIST"
			} else {
				text.Text = material.Comma(amount)
			}
			select {
			case floatingText <- packetFloatingText{text}:
			default:
			}
		},
	}

next:
	for {
		select {
		case packet, ok := <-packets:
			if !ok {
				return
			}
			if packet.Auth != nil {
				if player != nil {
					return
				}

				var fail string
				player, fail = hero.Login(addr, packet.Auth)
				if fail != "" {
					err = websocket.JSON.Send(ws, packetKick{fail})
					if err != nil && err != io.EOF {
						log.Printf("[err_sock] %s:%#v %v", addr, packetKick{fail}, err)
					}
					return
				}
				world.InitObject(player)
				kick, hud, inventory, messages = player.InitPlayer()
				zx, tx, zy, ty, zz := player.LoginPosition()
				defer hero.PlayerDisconnected(player)

				zone = world.GetZone(zx, zy, zz)
				zone.AddListener(listener)
				if player.CanSpawn() {
					zone.Tile(tx, ty).Add(player)
				} else {
					player.CharacterCreation("")
				}
				defer func() {
					if t := player.Position(); t != nil {
						player.UpdatePosition()
						t.Remove(player)
					}
					zone.RemoveListener(listener)
					world.ReleaseZone(zone)
				}()

				inventoryObjects := []*packetInventoryItem{}
				for _, item := range player.Inventory() {
					inventoryObjects = append(inventoryObjects, &packetInventoryItem{
						ID: item.NetworkID(),
						Object: addSprites(&packetUpdateObject{
							Name:    item.Name(),
							Actions: item.Actions(player),
						}, item),
					})
				}
				err = websocket.JSON.Send(ws, packetInventory{inventoryObjects})
				if err != nil {
					if err != io.EOF {
						log.Printf("[err_sock] %s:%#v %v", addr, packetInventory{inventoryObjects}, err)
					}
					return
				}
			}
			if player == nil {
				continue
			}
			if packet.Walk != nil {
				if t := player.Position(); t != nil {
					x, y := t.Position()
					if packet.Walk.X == x && packet.Walk.Y == y {
						player.ClearSchedule()
					} else {
						player.SetSchedule(world.NewWalkSchedule(packet.Walk.X, packet.Walk.Y, false, uint(player.Weight()/player.WeightMax())))
					}
				}
			}
			if packet.HUD != nil {
				switch packet.HUD.Name {
				default:
					return

				case "cc":
					if cmd, ok := packet.HUD.Data.(string); ok {
						player.CharacterCreation(cmd)
					} else {
						return
					}

				case "forge":
					data, ok := packet.HUD.Data.(map[string]interface{})
					if !ok {
						return
					}
					pos := player.Position()
					if pos == nil {
						return
					}
					x, y := pos.Position()
					if y == 0 {
						return
					}
					y--
					t := pos.Zone().Tile(x, y)
					for _, o := range t.Objects() {
						if forge, ok := o.(*material.Forge); ok {
							forge.Command(player, data)
							continue next
						}
					}
					return
				}
			}
			if packet.Chat != nil {
				if strings.TrimSpace(*packet.Chat) != "" {
					player.Chat(addr, *packet.Chat)
				}
			}
			if packet.Mouse != nil {
				color := "#0f0"
				if player.Position() == nil || player.Position().Zone().Tile(packet.Mouse.X, packet.Mouse.Y).Blocked() {
					color = "#f00"
				}
				update := map[string][]map[string]interface{}{
					"Update": {
						{
							"I": "_crosshair",
							"X": packet.Mouse.X,
							"Y": packet.Mouse.Y,
							"O": map[string][]packetUpdateSprite{
								"S": {
									{
										Sheet: "ui_icons",
										Color: color,
										Extra: map[string]interface{}{
											"x": 1,
										},
									},
								},
							},
						},
					},
				}
				if packet.Mouse.Fx != packet.Mouse.X || packet.Mouse.Fy != packet.Mouse.Y {
					update["Update"] = append([]map[string]interface{}{{
						"I": "_crosshair",
						"R": true,
						"X": packet.Mouse.Fx,
						"Y": packet.Mouse.Fy,
					}}, update["Update"]...)
				}
				err = websocket.JSON.Send(ws, update)
				if err != nil {
					if err != io.EOF {
						log.Printf("[err_sock] %s:%#v %v", addr, update, err)
					}
					return
				}
			}
			if packet.Interact != nil {
				if packet.Interact.X < 8 {
					inv := player.Inventory()
					i := int(packet.Interact.X) + 8*int(packet.Interact.Y)
					if len(inv) > i {
						if inv[i].NetworkID() == packet.Interact.ID {
							inv[i].Interact(player, packet.Interact.Action)
							continue
						}
					}
				}
				if player.Position() == nil {
					continue
				}
				for _, obj := range player.Position().Zone().Tile(packet.Interact.X, packet.Interact.Y).Objects() {
					if v, ok := obj.(world.Visible); ok && v.NetworkID() == packet.Interact.ID {
						v.Interact(player, packet.Interact.Action)
						break
					}
				}
			}
			if len(packet.Admin) > 0 {
				player.AdminCommand(addr, packet.Admin...)
			}

		case message := <-kick:
			websocket.JSON.Send(ws, packetKick{message})
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, packetKick{message}, err)
				}
				return
			}
			return

		case h := <-hud:
			err = websocket.JSON.Send(ws, packetHUD{h})
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, packetHUD{h}, err)
				}
				return
			}

		case items := <-inventory:
			objects := make([]*packetInventoryItem, len(items))
			for i, item := range items {
				objects[i] = &packetInventoryItem{
					ID: item.NetworkID(),
					Object: addSprites(&packetUpdateObject{
						Name:    item.Name(),
						Actions: item.Actions(player),
					}, item),
				}
			}
			err = websocket.JSON.Send(ws, packetInventory{objects})
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, packetInventory{objects}, err)
				}
				return
			}

		case update := <-updates:
			updateQueue.Update = append(updateQueue.Update, update...)

		case text := <-floatingText:
			err = websocket.JSON.Send(ws, text)
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, text, err)
				}
				return
			}

		case <-updateTick.C:
			if len(updateQueue.Update) == 0 {
				continue
			}

			if player == nil {
				continue
			}

			leftover := updateQueue.Update[:0]
			if len(updateQueue.Update) > 100 {
				updateQueue.Update, leftover = updateQueue.Update[:100], updateQueue.Update[100:]
			}

			if t := player.Position(); t != nil {
				updateQueue.PlayerX, updateQueue.PlayerY = t.Position()
			} else {
				updateQueue.PlayerX, updateQueue.PlayerY = 127, 127
			}

			err = websocket.JSON.Send(ws, updateQueue)
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, updateQueue, err)
				}
				return
			}

			updateQueue.Update = leftover

		case msg := <-messages:
			err = websocket.JSON.Send(ws, packetMessage{msg})
			if err != nil {
				if err != io.EOF {
					log.Printf("[err_sock] %s:%#v %v", addr, packetMessage{msg}, err)
				}
				return
			}
		}
	}
}
