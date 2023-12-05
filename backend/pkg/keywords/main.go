package keywords

import (
	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/adapters/db"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/daos"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type Service struct {
	log        *logrus.Logger
	repository daos.KeywordRepositoryInterface
}

type ServiceInterface interface {
	Upload(c *gin.Context)
	// Service
	CreateKeyword(keyword string)
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
