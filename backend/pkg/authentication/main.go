package authentication

import (
	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/middlewares"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type Service struct {
	log *logrus.Logger
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

	return &Service{
		log: logging.Initial(),
	}
}
