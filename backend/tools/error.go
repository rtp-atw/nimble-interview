package tools

import (
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

var log *logrus.Logger

func init() {
	log = logging.Initial()
}

func CheckError(err error) {

	if err != nil {
		log.Panic(err)
	}

}
