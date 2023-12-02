package middlewares

import (
	"fmt"
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

		validToken, err := jwt.ParseToken(token)

		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		fmt.Println("[valid token]", validToken)
		// GET USER THEN SAVE SOME DATA
		c.Set("user_token", validToken)

		c.Next()

	}
}
