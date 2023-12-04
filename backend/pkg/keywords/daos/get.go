package daos

import "github.com/rtp-atw/nimble-interview/pkg/keywords/models"

func (s *KeywordRepository) GetKeyword(id int32, uuid string) (keyword models.Keyword, err error) {

	tx := s.repositoryORM.Table(tableName).Where("id = ? OR uuid = '%s?%s'", id, uuid).Scan(&keyword)
	if tx.Error != nil {
		return models.Keyword{}, err
	}

	return keyword, nil
}

func (s *KeywordRepository) GetKeywords() (keyword []models.Keyword, err error) {

	tx := s.repositoryORM.Table(tableName).Where("is_deleted = ?", false).Scan(&keyword)
	if tx.Error != nil {
		return []models.Keyword{}, err
	}

	return keyword, nil
}
