package scraper

import (
	"fmt"
	"regexp"
	"sync"

	"github.com/go-rod/rod"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) Extract(uuid uuid.UUID, keyword string) (result ExtractData) {
	defer tools.Recovery()

	browser := s.collector.MustConnect()
	defer browser.MustClose()

	page := browser.MustPage(fmt.Sprintf("https://www.google.com/search?q=%s", keyword))

	page.MustWaitLoad()

	processAdsCH := make(chan int32, 1)
	processLinksCH := make(chan int32, 1)
	processResultCH := make(chan resultSearch, 1)
	processExtractCH := make(chan string, 1)
	errCH := make(chan error, 4)

	var wg sync.WaitGroup

	wg.Add(4)

	go s.channelProcessAds(page, processAdsCH, errCH, &wg)
	go s.channelProcessLinks(page, processLinksCH, errCH, &wg)
	go s.channelProcessResult(page, processResultCH, errCH, &wg)
	go s.channelProcessExtract(page, processExtractCH, errCH, &wg)

	go func() {
		wg.Wait()
		close(processAdsCH)
		close(processLinksCH)
		close(processResultCH)
		close(processExtractCH)
		close(errCH)
	}()

	for err := range errCH {
		// Error cases
		if err != nil {
			return
		}
	}

	browser.MustClose()

	numADS, numLinks, searchResult, rawHTML := <-processAdsCH, <-processLinksCH, <-processResultCH, <-processExtractCH

	result = ExtractData{
		UUID:         uuid,
		Keyword:      keyword,
		NumberOfAds:  numADS,
		NumberOfLink: numLinks,
		Result:       searchResult,
		HTML:         rawHTML,
	}
	return result
}

func (s *Service) channelProcessAds(p *rod.Page, ch chan int32, errCH chan error, wg *sync.WaitGroup) {
	defer tools.RoutineRecovery(errCH)
	defer wg.Done()

	s.log.Debugln("[ch] processing extract ads")

	linkADS, err := p.Elements("div[data-text-ad]")
	if err != nil {
		ch <- int32(0)
		panic(err)
	}

	// for _, l := range linkADS {
	// 	el, _ := l.Element("a")
	// 	link, _ := el.Attribute("href")
	// 	fmt.Println(*link)

	// }

	ch <- int32(len(linkADS))
}

func (s *Service) channelProcessLinks(p *rod.Page, ch chan int32, errCH chan error, wg *sync.WaitGroup) {
	defer tools.RoutineRecovery(errCH)
	defer wg.Done()

	s.log.Debugln("[ch] processing extract links")

	el := p.MustElement("div#search")

	likeElements, err := el.Elements("a[href]")

	if err != nil {
		ch <- int32(0)
		panic(err)
	}

	ch <- int32(len(likeElements))
}

func (s *Service) channelProcessResult(p *rod.Page, ch chan resultSearch, errCH chan error, wg *sync.WaitGroup) {
	defer tools.RoutineRecovery(errCH)
	defer wg.Done()

	s.log.Debugln("[ch] processing extract page result")

	data := resultSearch{}

	resultElem, err := p.Element("div#result-stats")
	if err != nil {
		ch <- data
		return
	}
	text, err := resultElem.Text()
	if err != nil {
		ch <- data
		panic(err)
	}

	re := regexp.MustCompile(`[\d,]+(?:\.\d+)?`)
	matches := re.FindAllString(text, -1)

	data.rawText = matches

	data.Dehydrate()

	ch <- data
}

func (s *Service) channelProcessExtract(p *rod.Page, ch chan string, errCH chan error, wg *sync.WaitGroup) {
	defer tools.RoutineRecovery(errCH)
	defer wg.Done()

	s.log.Debugln("[ch] processing extract html")

	html, err := p.HTML()
	if err != nil {
		ch <- ""
		panic(err)
	}

	ch <- html

}
