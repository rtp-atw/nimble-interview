package jwt

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var signingString []byte

type JWT struct {
	jwt.MapClaims
	ID    int32     `json:"id"`
	UUID  uuid.UUID `json:"uuid"`
	Email string    `json:"email"`
}

func init() {
	secretKEY := os.Getenv("JWT_SECRET_KEY")
	if secretKEY == "" {
		panic("[authentication][jwt] missing secrete key")
	}
	signingString = []byte(secretKEY)
}

func ParseToken(t string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return signingString, nil
	})

	if err != nil {
		return jwt.MapClaims{}, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	if !token.Valid {
		return jwt.MapClaims{}, errors.New("token is invalid")
	}

	return jwt.MapClaims{}, err
}

func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 16)
	if err != nil {
		return "", err
	}

	return string(hashed), nil
}

func ComparePassword(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func GetClaim(c *gin.Context) JWT {
	ctxClaim, ok := c.Value("user_claim").(jwt.MapClaims)

	jwt := JWT{}

	if !ok {
		c.JSON(http.StatusUnauthorized, &gin.H{})
		return jwt
	}

	jwt.ID = int32(ctxClaim["id"].(float64))
	jwt.UUID, _ = uuid.Parse(ctxClaim["uuid"].(string))
	jwt.Email = ctxClaim["email"].(string)

	return jwt
}
