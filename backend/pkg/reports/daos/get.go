package daos

func (s *ReportRepository) GetReport(id int32, uuid string) (report Report, err error) {

	tx := s.repositoryORM.Table(tableReport).
		Where(`
			(id = ? OR uuid like '?')
			AND is_deleted = FALSE
		`, id, uuid).
		Scan(&report)

	if tx.Error != nil {
		return Report{}, err
	}

	return report, nil
}

func (s *ReportRepository) GetReports(userUUID string) (reports []Report, err error) {

	tx := s.repositoryORM.Table(tableReport).Debug().
		Select("reports.*, keywords.keyword").
		Where("reports.user_uuid = ? AND reports.is_deleted = FALSE", userUUID).
		Joins("LEFT JOIN keywords ON keywords.uuid = reports.keyword_uuid").
		Order(`reports.is_extracted DESC, reports.id ASC`).
		Scan(&reports)

	if tx.Error != nil {
		return []Report{}, err
	}

	return reports, nil
}
