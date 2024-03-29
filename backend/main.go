package main

import (
	"github.com/rtp-atw/nimble-interview/adapters/db"
	"github.com/rtp-atw/nimble-interview/router"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

var log *logrus.Logger

func init() {
	log = logging.Initial()
	log.Infoln("[project] initializing")

	db.Initial()
}

func main() {

	router.NewRouter()

	log.Infoln("[project] initialized")

}
