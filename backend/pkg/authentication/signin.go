package authentication

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/daos"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) SignIn(c *gin.Context) {
	defer tools.GinRecovery(c)

	type reqBody struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var req reqBody

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusUnauthorized, &gin.H{})
		return
	}

	payload := daos.GetUserPayload{
		Email: req.Email,
	}

	daoUser, err := s.repository.GetUserByEmail(payload)
	if err != nil {
		c.JSON(http.StatusUnauthorized, &gin.H{})
		return
	}

	passwordMatched := jwt.ComparePassword(daoUser.Password, req.Password)

	if !passwordMatched {
		c.JSON(http.StatusUnauthorized, &gin.H{})
		return
	}

	user := models.User{
		ID:    int32(daoUser.ID),
		Email: daoUser.Email,
		UUID:  daoUser.UUID,
	}

	user.GenerateToken()

	c.JSON(http.StatusOK, user)
}
