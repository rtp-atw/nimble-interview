package authentication

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) SignIn(c *gin.Context) {
	defer tools.GinRecovery(c)

	user := models.User{}

	user.GenerateToken()

	c.JSON(http.StatusOK, user)
}
