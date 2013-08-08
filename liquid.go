package main

type Liquid struct {
	networkID
}

func (l *Liquid) Name() string {
	return "water"
}

func (l *Liquid) Examine() string {
	return "a pool of water."
}

func (l *Liquid) Blocking() bool {
	return true
}

func (l *Liquid) ZIndex() int {
	return 0
}
