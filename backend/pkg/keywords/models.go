package keywords

import (
	"strings"
	"sync"
)

type Keywords struct {
	Data []string
}

func (k *Keywords) dehydrate(records [][]string) {
	processChan := make(chan []string, len(records))

	var wg sync.WaitGroup

	decouplingFunc := func(data []string, ch chan []string, wg *sync.WaitGroup) {
		defer wg.Done()

		filteredData := []string{}
		for _, d := range data {
			// Filter unexpected value
			if strings.Contains(d, " ") {
				continue
			}
			if d == "" {
				continue
			}

			filteredData = append(filteredData, d)
		}

		ch <- filteredData
	}

	for _, r := range records {
		wg.Add(1)
		go decouplingFunc(r, processChan, &wg)
	}

	go func() {
		wg.Wait()
		close(processChan)
	}()

	for keys := range processChan {
		k.Data = append(k.Data, keys...)
	}
}
