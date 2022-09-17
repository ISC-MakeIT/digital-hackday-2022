package infrastructure

import (
	"github.com/gin-gonic/gin"
	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/controllers"
)

type Routing struct {
	// DB *DB
	Gin  *gin.Engine
	Port string
}

func NewRouting() *Routing {
	r := &Routing{
		Gin:  gin.Default(),
		Port: ":8080",
	}
	r.setRouting()
	return r
}

func (r *Routing) setRouting() {
	controller := controllers.NewRestauirantController()
	r.Gin.POST("/", func(c *gin.Context) { controller.FindNearbyRestaurant(c) })
}

func (r *Routing) Run() {
	r.Gin.Run(r.Port)
}
