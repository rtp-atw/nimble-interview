package keywords

import (
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/daos"
)

func (s *Service) CreateKeyword(keyword string) {
	payload := daos.CreateKeywordPayload{
		UUID:    uuid.New(),
		Keyword: keyword,
	}
	s.repository.InsertKeyword(payload)
}
