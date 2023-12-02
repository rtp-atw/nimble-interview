package authentication

import (
	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type Service struct {
	log *logrus.Logger
}

type ServiceInterface interface {
	SignIn(c *gin.Context)
	SignUp(c *gin.Context)
}

func init() {
}

func Register() ServiceInterface {
	return &Service{
		log: logging.Initial(),
	}
}
