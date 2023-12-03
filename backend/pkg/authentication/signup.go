package authentication

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/daos"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) SignUp(c *gin.Context) {
	defer tools.GinRecovery(c)
	type reqBody struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var req reqBody

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, &gin.H{})
		return
	}

	payload := daos.CreateUserPayload{
		UUID:     uuid.New(),
		Email:    req.Email,
		Password: req.Password,
	}

	daoUser := s.repository.CreateUser(payload)

	user := models.User{
		ID:    int32(daoUser.ID),
		Email: daoUser.Email,
		UUID:  daoUser.UUID,
	}

	user.GenerateToken()

	c.JSON(http.StatusOK, user)
}
