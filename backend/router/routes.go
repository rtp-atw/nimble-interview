package router

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

var log *logrus.Logger

var appStage string

func init() {
	log = logging.Initial()

	if envStage := os.Getenv("APP_STAGE"); envStage == "production" {
		appStage = "release"
	} else {
		appStage = "debug"
	}

	gin.SetMode(appStage)

}

func NewRouter() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Run(":8000")

}
