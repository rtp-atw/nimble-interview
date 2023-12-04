package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
)

type MiddlewareInterface interface {
	Validator() gin.HandlerFunc
}

type Middleware struct {
}

func (m *Middleware) Validator() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		userClaim, err := jwt.ParseToken(token)

		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// GET USER THEN SAVE SOME DATA
		c.Set("user_claim", userClaim)

		c.Next()

	}
}
