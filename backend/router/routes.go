package router

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/keywords"
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

	keywordsService := keywords.Register()

	r.MaxMultipartMemory = 8 << 20 // 8 MiB

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})

		v1 := api.Group("/v1")
		{
			keywords := v1.Group("/keywords")
			{

				keywords.POST("/upload", keywordsService.Upload)
			}
		}
	}

	r.Run(":8000")

}
