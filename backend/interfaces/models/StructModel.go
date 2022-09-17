package models

import (
	"strconv"
)

type (
	Response struct {
		Result Results `json:"results"`
	}
	Results struct {
		APIVersion       string `json:"api_version"`
		ResultsAvailable int    `json:"results_available"`
		ResultsReturned  string `json:"results_returned"`
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

type RequestModel struct {
	Lat       string
	Long      string
	AreaRange string
}

func NewRequestModel(lat, long float64, areaRange int) (*RequestModel, error) {
	r := &RequestModel{}
	if err := r.setLatiude(lat); err != nil {
		return nil, err
	}
	if err := r.setLongitude(long); err != nil {
		return nil, err
	}
	if err := r.setAreaRange(areaRange); err != nil {
		return nil, err
	}
	return r, nil
}

func (r *RequestModel) setLatiude(lat float64) error {
	LatS := strconv.FormatFloat(lat, 'f', -1, 64)
	r.Lat = LatS
	return nil
}

func (r *RequestModel) setLongitude(long float64) error {
	longS := strconv.FormatFloat(long, 'f', -1, 64)
	r.Long = longS
	return nil
}
func (r *RequestModel) setAreaRange(area int) error {
	r.AreaRange = strconv.Itoa(area)
	return nil
}

func (r *RequestModel) GetLatiude() string {
	return r.Lat
}

func (r *RequestModel) GetLongitude() string {
	return r.Long
}

func (r *RequestModel) GetAreaRange() string {
	return r.AreaRange
}
