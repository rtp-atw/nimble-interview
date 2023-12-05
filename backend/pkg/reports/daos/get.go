package daos

func (s *ReportRepository) GetReport(id int32, uuid string, userUUID string) (report Report, err error) {

	tx := s.repositoryORM.Table(tableReport).Debug().
		Where(`
			(reports.id = ? OR reports.uuid like ?)
			AND reports.user_uuid = ?
			AND reports.is_deleted = FALSE
		`, id, uuid, userUUID).
		Joins("LEFT JOIN keywords ON keywords.uuid = reports.keyword_uuid").
		Scan(&report)

	if tx.Error != nil {
		return Report{}, err
	}

	return report, nil
}

func (s *ReportRepository) GetReports(userUUID string) (reports []Report, err error) {

	tx := s.repositoryORM.Table(tableReport).
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
