package authentication

import (
	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/adapters/db"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/daos"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/middlewares"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type Service struct {
	log        *logrus.Logger
	repository daos.AuthenticationRepositoryInterface

	middlewares.Middleware
}

type ServiceInterface interface {
	SignIn(c *gin.Context)
	SignUp(c *gin.Context)
	middlewares.MiddlewareInterface
}

func init() {
}

func Register() ServiceInterface {
	dbService := db.Initial()

	return &Service{
		log:        logging.Initial(),
		repository: daos.Register(dbService.DB, dbService.ORM),
	}
}
