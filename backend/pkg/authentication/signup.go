package authentication

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) SignUp(c *gin.Context) {
	defer tools.GinRecovery(c)

	c.JSON(http.StatusOK, &gin.H{})
}
