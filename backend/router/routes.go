package router

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication"
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

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	keywordsService := keywords.Register()
	authService := authentication.Register()

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
			usersAuth := v1.Group("/users")
			usersAuth.Use(authService.Validator())
			{
				usersAuth.GET("/profile")
			}

			users := v1.Group("/users")
			{
				users.POST("/signin", authService.SignIn)
				users.POST("/signup", authService.SignUp)
			}

			keywords := v1.Group("/keywords")
			keywords.Use(authService.Validator())
			{
				keywords.GET("", func(c *gin.Context) {
					c.JSON(200, gin.H{
						"message": "pong",
					})
				})
				keywords.POST("/upload", keywordsService.Upload)
			}

		}
	}

	r.Run(":8000")

}
