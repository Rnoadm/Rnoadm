package main

import (
	"math"
)

type WoodType uint8

const (
	Oak WoodType = iota
	Beonetwon
	DeadTree
	Maple
	Birch
	Willow
	Juniper

	woodTypeCount
)

var woodTypeInfo = [woodTypeCount]struct {
	Name      string
	Color     Color
	LeafColor Color
	Strength  uint64
	sqrtStr   uint64
}{
	Oak: {
		Name:      "oak",
		Color:     "#dab583",
		LeafColor: "#919a2a",
		Strength:  50,
	},
	Beonetwon: {
		Name:      "beonetwon",
		Color:     "#00b120",
		LeafColor: "#b120ee",
		Strength:  1 << 62,
	},
	DeadTree: {
		Name:     "rotting",
		Color:    "#5f5143",
		Strength: 50,
	},
	Maple: {
		Name:      "maple",
		Color:     "#ffb963",
		LeafColor: "#aa5217",
		Strength:  50,
	},
	Birch: {
		Name:      "birch",
		Color:     "#d0ddd0",
		LeafColor: "#29995c",
		Strength:  50,
	},
	Willow: {
		Name:      "willow",
		Color:     "#9e9067",
		LeafColor: "#4e6b2c",
		Strength:  50,
	},
	Juniper: {
		Name:      "juniper",
		Color:     "#c2b19a",
		LeafColor: "#3e4506",
		Strength:  50,
	},
}

func init() {
	for t := range woodTypeInfo {
		if woodTypeInfo[t].Strength >= 1<<60 {
			woodTypeInfo[t].sqrtStr = woodTypeInfo[t].Strength - 1
		} else {
			woodTypeInfo[t].sqrtStr = uint64(math.Sqrt(float64(woodTypeInfo[t].Strength)))
		}
	}
}

type Tree struct {
	Type WoodType
}

func (t *Tree) Name() string {
	return woodTypeInfo[t.Type].Name + " tree"
}

func (t *Tree) Examine() string {
	return "a tall " + woodTypeInfo[t.Type].Name + " tree."
}

func (t *Tree) Paint(x, y int, setcell func(int, int, string, string, Color)) {
	setcell(x, y, "", "tree_trunk", woodTypeInfo[t.Type].Color)
	if color := woodTypeInfo[t.Type].LeafColor; color != "" {
		setcell(x, y, "", "tree_leaves", color)
	}
}

func (t *Tree) Blocking() bool {
	return true
}

func (t *Tree) InteractOptions() []string {
	return []string{"chop down"}
}

func (t *Tree) Interact(x uint8, y uint8, player *Player, zone *Zone, opt int) {
	switch opt {
	case 0: // chop down
		player.Lock()
		var schedule Schedule = &ChopTreeSchedule{X: x, Y: y, T: t}
		if tx, ty := player.TileX, player.TileY; (tx-x)*(tx-x)+(ty-y)*(ty-y) > 1 {
			moveSchedule := MoveSchedule(FindPath(zone, tx, ty, x, y, false))
			schedule = &ScheduleSchedule{&moveSchedule, schedule}
		}
		player.schedule = schedule
		player.Unlock()
	}
}

type Logs struct {
	Type WoodType
}

func (l *Logs) Name() string {
	return woodTypeInfo[l.Type].Name + " logs"
}

func (l *Logs) Examine() string {
	return "some " + woodTypeInfo[l.Type].Name + " logs."
}

func (l *Logs) Paint(x, y int, setcell func(int, int, string, string, Color)) {
	setcell(x, y, "", "item_logs", woodTypeInfo[l.Type].Color)
}

func (l *Logs) Blocking() bool {
	return false
}

func (l *Logs) InteractOptions() []string {
	return nil
}

func (l *Logs) Interact(x uint8, y uint8, player *Player, zone *Zone, opt int) {
}

func (l *Logs) IsItem() {}

func (l *Logs) AdminOnly() bool {
	return woodTypeInfo[l.Type].Strength >= 1<<60
}

type Hatchet struct {
	Head   MetalType
	Handle WoodType
}

func (h *Hatchet) Name() string {
	return metalTypeInfo[h.Head].Name + " hatchet"
}

func (h *Hatchet) Examine() string {
	return "a hatchet made from " + metalTypeInfo[h.Head].Name + " and " + woodTypeInfo[h.Handle].Name + "."
}

func (h *Hatchet) Paint(x, y int, setcell func(int, int, string, string, Color)) {
	setcell(x, y, "", "item_tool_handle", woodTypeInfo[h.Handle].Color)
	setcell(x, y, "", "item_tool_hatchet", metalTypeInfo[h.Head].Color)
}

func (h *Hatchet) Blocking() bool {
	return false
}

func (h *Hatchet) InteractOptions() []string {
	return nil
}

func (h *Hatchet) Interact(x uint8, y uint8, player *Player, zone *Zone, opt int) {
}

func (h *Hatchet) IsItem() {}

func (h *Hatchet) AdminOnly() bool {
	return metalTypeInfo[h.Head].Strength >= 1<<60 || woodTypeInfo[h.Handle].Strength >= 1<<60
}

type ChopTreeSchedule struct {
	Delayed bool
	X, Y    uint8
	T       *Tree
}

func (s *ChopTreeSchedule) Act(z *Zone, x uint8, y uint8, h *Hero, p *Player) bool {
	if !s.Delayed {
		s.Delayed = true
		h.scheduleDelay = 10
		return true
	}
	if (s.X-x)*(s.X-x)+(s.Y-y)*(s.Y-y) > 1 {
		if p != nil {
			p.SendMessage("that is too far away!")
		}
		return false
	}

	h.Lock()
	h.Delay++
	hatchet := h.Toolbelt.Hatchet
	h.Unlock()
	if hatchet == nil {
		if p != nil {
			p.SendMessage("you do not have a hatchet on your toolbelt.")
		}
		return false
	}

	hatchetMax := metalTypeInfo[hatchet.Head].Strength + woodTypeInfo[hatchet.Handle].Strength
	hatchetMin := metalTypeInfo[hatchet.Head].sqrtStr + woodTypeInfo[hatchet.Handle].sqrtStr

	treeMax := woodTypeInfo[s.T.Type].Strength
	treeMin := woodTypeInfo[s.T.Type].sqrtStr

	z.Lock()
	r := z.Rand()
	hatchetScore := uint64(r.Int63n(int64(hatchetMax-hatchetMin+1))) + hatchetMin
	treeScore := uint64(r.Int63n(int64(treeMax-treeMin+1))) + treeMin
	if p != nil {
		switch {
		case hatchetScore < treeScore/5:
			p.SendMessage("your " + hatchet.Name() + " doesn't even make a dent in the " + s.T.Name() + ".")
		case hatchetScore < treeScore*2/3:
			p.SendMessage("your " + hatchet.Name() + " makes a dent in the " + s.T.Name() + ", but nothing interesting happens.")
		case hatchetScore < treeScore:
			p.SendMessage("your " + hatchet.Name() + " almost chops the " + s.T.Name() + " to the ground. you carefully replace the tree and prepare for another attempt.")
		case hatchetScore < treeScore*3/4:
			p.SendMessage("your " + hatchet.Name() + " just barely makes it through the " + s.T.Name() + ".")
		case hatchetScore < treeScore*2:
			p.SendMessage("your " + hatchet.Name() + " fells the " + s.T.Name() + " with little difficulty.")
		case hatchetScore > treeScore*1000:
			p.SendMessage("your " + hatchet.Name() + " slices through the " + s.T.Name() + " like a chainsaw through butter.")
		default:
			p.SendMessage("your " + hatchet.Name() + " slices through the " + s.T.Name() + " like a knife through butter.")
		}
	}
	if treeScore <= hatchetScore {
		if z.Tile(s.X, s.Y).Remove(s.T) {
			z.Unlock()
			z.Repaint()
			h.Lock()
			h.GiveItem(&Logs{Type: s.T.Type})
			h.Unlock()
			if p != nil {
				p.Repaint()
			}
			return false
		}
	}
	z.Unlock()

	return false
}
