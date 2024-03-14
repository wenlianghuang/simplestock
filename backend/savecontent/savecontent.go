package savecontent

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly/v2"
)

type Stock8088 struct {
	Highest string `json:"highest"`
	Lowest  string `json:"lowest"`

	Open   string `json:"open"`
	Final  string `json:"final"`
	Updown string `json:"updown"`
}

func SaveContent(c *gin.Context) {
	webcraw := colly.NewCollector()
	var somecontent []string
	// 抓類別Class 名稱
	webcraw.OnHTML(".price-detail-item > span", func(e *colly.HTMLElement) {
		somecontent = append(somecontent, e.Text)
	})

	//webcraw.Visit("https://tw.stock.yahoo.com/quote/8088.TWO")
	webcraw.Visit("https://tw.stock.yahoo.com/quote/3704.TWO")
	//After visit all the element
	openfloat, err1 := strconv.ParseFloat(somecontent[3], 64)
	finalfloat, err2 := strconv.ParseFloat(somecontent[1], 64)
	if err1 != nil || err2 != nil {
		fmt.Println("無法將字符串轉換為浮點數:", err1, err2)
		return
	}
	fmt.Println(openfloat)
	fmt.Println(finalfloat)
	if finalfloat < openfloat {
		somecontent[17] = "-" + somecontent[17]
	}
	response := Stock8088{Highest: somecontent[5], Lowest: somecontent[7], Open: somecontent[3], Final: somecontent[1], Updown: somecontent[17]}

	c.JSON(http.StatusOK, response)
}
