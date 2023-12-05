package reports

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/reports/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) GetReports(ctx *gin.Context) {
	defer tools.GinRecovery(ctx)

	user := jwt.GetClaim(ctx)

	reports := []models.Report{}
	daoReports, err := s.repository.GetReports(user.UUID.String())
	if err != nil {
		panic(err)
	}

	for _, r := range daoReports {
		reports = append(reports, models.Report{
			ID:          r.ID,
			UUID:        r.UUID,
			UserUUID:    r.UserUUID,
			KeywordUUID: r.KeywordUUID,
			Keyword:     r.Keyword,
			Ads:         r.Ads,
			Links:       r.Links,
			TotalResult: r.TotalResult,
			ProcessTime: r.ProcessTime,
			HTML:        r.HTML,
			IsExtracted: r.IsExtracted,
		})
	}

	ctx.JSON(http.StatusOK, reports)
}

func (s *Service) GetReport(ctx *gin.Context) {
	defer tools.GinRecovery(ctx)

	reportID := ctx.Param("id")
	if reportID == "" {
		ctx.JSON(http.StatusBadRequest, &gin.H{})
		return
	}

	intReportID, err := strconv.ParseInt(reportID, 10, 32)
	tools.CheckError(err)

	user := jwt.GetClaim(ctx)

	daoReport, err := s.repository.GetReport(int32(intReportID), "", user.UUID.String())
	if err != nil {
		panic(err)
	}

	ctx.JSON(http.StatusOK, models.Report{
		ID:          daoReport.ID,
		UUID:        daoReport.UUID,
		UserUUID:    daoReport.UserUUID,
		KeywordUUID: daoReport.KeywordUUID,
		Keyword:     daoReport.Keyword,
		Ads:         daoReport.Ads,
		Links:       daoReport.Links,
		TotalResult: daoReport.TotalResult,
		ProcessTime: daoReport.ProcessTime,
		HTML:        daoReport.HTML,
		IsExtracted: daoReport.IsExtracted,
	})
}
