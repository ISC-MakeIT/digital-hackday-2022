package main

import (
	"github.com/ISC-MakeIT/digital-hackday-2022/infrastructure"
)


func main() {
	r := infrastructure.NewRouting()
	r.Run()
}
