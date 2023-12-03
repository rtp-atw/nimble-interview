package tools

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
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

func GinRecovery(ctx *gin.Context) {
	if r := recover(); r != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": r,
		})
	}
}

func RoutineRecovery(ch chan error) {
	if r := recover(); r != nil {
		err, matched := r.(error)
		if matched {
			ch <- err
			return
		}

		ch <- errors.New("unknow error")
	}

}
