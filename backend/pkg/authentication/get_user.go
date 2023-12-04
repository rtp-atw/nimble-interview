package authentication

import "github.com/rtp-atw/nimble-interview/pkg/authentication/models"

func (s *Service) GetUser(id int32, uuid string) (models.User, error) {

	daoUser, err := s.repository.GetUser(id, uuid)
	if err != nil {
		return models.User{}, err
	}

	user := models.User{
		ID:    int32(daoUser.ID),
		UUID:  daoUser.UUID,
		Email: daoUser.Email,
	}

	return user, nil
}
