package models

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type User struct {
	ID    int32     `json:"id"`
	UUID  uuid.UUID `json:"uuid"`
	Email string    `json:"email"`
	Token string    `json:"token"`
}

type UserClaim struct {
	jwt.RegisteredClaims
	ID    int32     `json:"id"`
	UUID  uuid.UUID `json:"uuid"`
	Email string    `json:"email"`
}

func (u *User) GenerateToken() {
	secretKEY := os.Getenv("JWT_SECRET_KEY")
	if secretKEY == "" {
		panic("[authentication][user] missing secrete key")
	}

	claims := UserClaim{
		jwt.RegisteredClaims{
			ID:        string(u.ID),
			Issuer:    "nimble-backend",
			ExpiresAt: jwt.NewNumericDate(time.Now().AddDate(0, 7, 0)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
		u.ID,
		u.UUID,
		u.Email,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secretKEY))

	if err != nil {
		panic("[authentication][user] can't sign jwt token")
	}

	u.Token = signedToken
}
