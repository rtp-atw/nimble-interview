package router

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication"
	"github.com/rtp-atw/nimble-interview/pkg/keywords"
	"github.com/rtp-atw/nimble-interview/pkg/reports"
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

	r.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Length", "Content-Type", "Cache-Control", "Connection", "Transfer-Encoding", "Access-Control-Allow-Origin", "X-User-Token", "X-Auth-Key"},
		AllowCredentials: false,
		AllowAllOrigins:  true,
		MaxAge:           12 * time.Hour,
	}))

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	keywordsService := keywords.Register()
	authService := authentication.Register()
	reportService := reports.Register()

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
				keywords.POST("/upload", keywordsService.Upload)
			}

			report := v1.Group("/reports")
			report.Use(authService.Validator())
			{
				report.GET("", reportService.GetReports)
				report.GET("/:id", reportService.GetReport)
			}

		}
	}

	r.Run(":8000")

}
