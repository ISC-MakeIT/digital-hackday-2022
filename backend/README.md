[apiのリファレンス](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)


ファイル構成
root
  infrastructure
    config.go
    Routing.go
  usecase
    xxx.go
  docker-compose.yml
  main.go



## responseデータ
検索条件に満たした件数
取得した件数
検索結果の開始位置
店舗情報
    - id
    - name
    - name_kana
    - address
    - station_name
    - lat
    - lng
    - genre
        - name    // ジャンル名
        - catch   // お店ジャンルキャッチ　例：一口餃子専門店
    - access
    - urls
    - photo
        - pc
            - s  // sサイズの写真
        - mobile
            - s  // sサイズの写真
    - open       // 営業時間　曜日
    - close      // 定休日
    - midnight   // 23時以降も営業してるか？


# 開発の役に立ちそうな情報
## mapbox
- 数字は10進法の度数で、緯度は-90〜90、経度は-180〜180の範囲で表されます。









key := "2490fa54f7630e43"






package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type (
	Response struct {
		Result Results `json:"results"`
	}
	Results struct {
		APIVersion       string `json:"api_version"`
		ResultsAvailable int    `json:"results_available"`
		ResultsReturned  string    `json:"results_returned"`
		ResultsStart     int    `json:"results_start"`
		Shop             []Shop `json:"shop"`
	}
	Shop struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		// LogoImage   string `json:"logo_image"`
		NameKana    string  `json:"name_kana"`
		Address     string  `json:"address"`
		StationName string  `json:"station_name"`
		Lat         float64 `json:"lat"`
		Lng         float64 `json:"lng"`
		Genre       Genres  `json:"genre"`
		Average     string  `json:"average"`
		Access      string  `json:"access"`
		Url         urls    `json:"urls"`
		Photo       Photos  `json:"photo"`
		Open        string  `json:"open"`
		Close       string  `json:"close"`
		Midnight    string  `json:"midnight"`
	}
	Genres struct {
		Name  string `json:"name"`
		Catch string `json:"catch"`
	}
	urls struct {
		Pc string `json:"pc"`
	}
	Photos struct {
		Pc     Pc     `json:"pc"`
		Mobile Mobile `json:"Mobile"`
	}
	Pc struct {
		S string `json:"s"`
	}

	Mobile struct {
		S string `json:"s"`
	}
)

func main() {
	key := "2490fa54f7630e43"
	url := "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" + key + "&address=" + "横浜" + "&format=json"
	// url := "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=2490fa54f7630e43&address=%E6%A8%AA%E6%B5%9C&format=json"
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	var data Response
	// data := make([]Item, 0) のように要素数0の slice としても良い

	if err := json.Unmarshal(body, &data); err != nil {
		log.Fatal(err)
	}
	fmt.Println(data)

	// for _, item := range data {
	//         fmt.Printf("%d\n", item.Shop)
	// }
}
