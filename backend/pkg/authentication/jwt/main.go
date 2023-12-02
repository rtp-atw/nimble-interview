package jwt

import (
	"errors"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

var signingString []byte

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
