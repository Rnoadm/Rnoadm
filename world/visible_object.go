package world

import (
	"sync/atomic"
)

type Visible interface {
	ObjectLike

	NetworkID() uint64

	// Name is the user-visible name of this object. Title Case is used for
	// important living objects. All other objects are fully lowercase.
	Name() string

	// Sprite is sent to the client as the name of the image (minus ".png"
	// extension) to use as a sprite sheet.
	Sprite() string

	// SpriteSize is the height and width of each sprite on this object's
	// sprite sheet.
	SpriteSize() (uint, uint)

	// AnimationType returns a string defined in client code. Empty string
	// means no animation.
	AnimationType() string

	// SpritePos is the position of the base sprite in the sprite sheet.
	// Each color increases the y value on the client, and each animation
	// frame increases the x value.
	SpritePos() (uint, uint)

	Scale() uint

	Colors() []string

	Attached() []Visible

	Blocking() bool

	Actions() []string

	Interact(player CombatInventoryMessageAdmin, action string)
}

type VisibleObject struct {
	Object

	networkID uint64 // not saved
}

func init() {
	Register("visobj", Visible((*VisibleObject)(nil)))
}

var nextNetworkID uint64

func (o *VisibleObject) NetworkID() uint64 {
	if id := atomic.LoadUint64(&o.networkID); id != 0 {
		// simple case: we already have a network ID; return it
		return id
	}
	// set our network ID to the next available ID, but do nothing if
	// we already have an ID set.
	atomic.CompareAndSwapUint64(&o.networkID, 0, atomic.AddUint64(&nextNetworkID, 1))
	// we definitely have a network ID at this point; return it.
	return atomic.LoadUint64(&o.networkID)
}

func (o *VisibleObject) Name() string {
	return "unknown"
}

func (o *VisibleObject) Sprite() string {
	return "ui_r1"
}

func (o *VisibleObject) SpriteSize() (uint, uint) {
	return 32, 32
}

func (o *VisibleObject) AnimationType() string {
	return ""
}

func (o *VisibleObject) SpritePos() (uint, uint) {
	return 0, 0
}

func (o *VisibleObject) Scale() uint {
	return 1
}

func (o *VisibleObject) Colors() []string {
	return []string{"#f0f"}
}

func (o *VisibleObject) Attached() []Visible {
	return nil
}

func (o *VisibleObject) Blocking() bool {
	return false
}

func (o *VisibleObject) Actions() []string {
	var actions []string
	if _, ok := o.Outer().(Item); ok {
		if o.Position() == nil {
			actions = append(actions, "drop")
		} else {
			actions = append(actions, "take")
		}
	}
	return actions
}

func (o *VisibleObject) Interact(player CombatInventoryMessageAdmin, action string) {
	switch action {
	case "drop":
		if _, ok := o.Outer().(Item); ok {
			if player.RemoveItem(o.Outer().(Visible)) {
				player.Position().Add(o.Outer())
			}
		}
	case "take":
		pos := o.Position()
		if pos == nil {
			player.SendMessage("somebody else took that!")
			return
		}
		if player.Position() != pos {
			sx, sy := player.Position().Position()
			ex, ey := pos.Position()
			player.SetSchedule(&ScheduleSchedule{
				Schedules: []Schedule{
					NewWalkSchedule(sx, sy, ex, ey),
					&ActionSchedule{
						Action: "take",
						Target: o.Outer().(Visible),
					},
				},
			})
			return
		}
		if _, ok := o.Outer().(Item); ok {
			if pos.Remove(o.Outer()) {
				if !player.GiveItem(o.Outer().(Visible)) {
					pos.Add(o.Outer())
				}
			}
		}
	}
}
