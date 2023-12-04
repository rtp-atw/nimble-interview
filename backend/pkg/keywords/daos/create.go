package daos

import "gorm.io/gorm/clause"

func (s *KeywordRepository) InsertKeyword(payload CreateKeywordPayload) {

	newKeyword := Keyword{
		UUID:    payload.UUID,
		Keyword: payload.Keyword,
	}

	tx := s.repositoryORM.Table(tableName).Clauses(clause.OnConflict{DoNothing: true}).Create(&newKeyword)
	if tx.Error != nil {
		panic(tx.Error.Error())
	}

}
