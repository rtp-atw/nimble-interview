package daos

func (s *ReportRepository) GetReport(id int32, uuid string) (keyword Report, err error) {

	tx := s.repositoryORM.Table(tableReport).
		Where(`
			(id = ? OR uuid like '?')
			AND is_deleted = FALSE
		`, id, uuid).
		Scan(&keyword)

	if tx.Error != nil {
		return Report{}, err
	}

	return keyword, nil
}

func (s *ReportRepository) GetReports() (keyword []Report, err error) {

	tx := s.repositoryORM.Table(tableReport).Where("is_deleted = FALSE").Scan(&keyword)
	if tx.Error != nil {
		return []Report{}, err
	}

	return keyword, nil
}
