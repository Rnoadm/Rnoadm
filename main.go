package main

import (
	"golang.org/x/net/websocket"
	_ "github.com/Rnoadm/Rnoadm-Legacy/critter"
	"github.com/Rnoadm/Rnoadm-Legacy/hero"
	_ "github.com/Rnoadm/Rnoadm-Legacy/material"
	"github.com/Rnoadm/Rnoadm-Legacy/world"
	"math/rand"
	"net/http"
	_ "net/http/pprof"
	"os"
	"os/signal"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	http.Handle("/ws", websocket.Handler(socketHandler))
	http.HandleFunc("/", staticHandler)

	srv := &http.Server{
		Addr: ":2064",
	}

	go func() {
		for {
			srv.ListenAndServe()
		}
	}()

	go func() {
		for _ = range time.Tick(time.Second / 5) {
			world.Think()
		}
	}()

	defer world.SaveAllZones()
	defer hero.SaveAllPlayers()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, os.Kill)
	<-sigCh
}
