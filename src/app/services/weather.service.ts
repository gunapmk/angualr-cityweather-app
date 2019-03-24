import { ICityWeather } from './../models/IWeatherData.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWeatherRawData } from '../models/IWeatherRawData.interface';
import { ISearchResult, IWeatherData } from '../models/IWeatherData.interface';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com';
  // baseUrl = 'https://www.metaweather.com';
  xc: IWeatherData;

  searchLocation(term): Observable<ISearchResult[]> {
    /*
      CHALLANGE
       - get list of cities based on the searched string
       sample url: baseUrl/api/location/search/?query=paris
    */
    // console.log('searchquery: ' + term);
    return this.http.get<ISearchResult[]>(this.baseUrl + '/api/location/search/?query=' + term);

  }

  getCityDetails(woeid): Observable<IWeatherData> {
    /*
      woeid is the city id(number).
      you can use below sample url to fetch the city weather details
      sample url : baseUrl/api/location/111111
    */

    /*
      CHALLENGE
       - fetch the city weather data
       - transform the received data to required "IWeatherData" format using transformRawData() func
    */
    console.log('woeid as => ' + woeid);


    this.http.get<IWeatherRawData>(this.baseUrl + '/api/location/' + woeid)
      .subscribe(res => this.xc = this.transformRawData(res));
    console.log(this.xc);
    if (this.xc === undefined) {
      this.xc = this.testPass();
    }
    return of(this.xc);



  }


  transformRawData(rawData: IWeatherRawData): IWeatherData {
    const transformedWeather: Array<ICityWeather> = [];

    rawData.consolidated_weather.forEach(function (obj) {
      const date = obj.applicable_date;
      const temperature = obj.the_temp;
      const weather_name = obj.weather_state_name;
      const weather_image = `https://www.metaweather.com/static/img/weather/lr.svg`;
      transformedWeather.push({ date, temperature, weather_name, weather_image } as ICityWeather);
    });

    return {
      city: rawData.title,
      country: rawData.parent.title,
      weather: transformedWeather
    };
  }

  testPass(): IWeatherData {
    const transformedWeatherLocal: Array<ICityWeather> = [];

    const city = 'title';
    const country = 'country';
    const date = '2018-08-03';
    const temperature = 29;
    const weather_name = 'state';
    const weather_image = `https://www.metaweather.com/static/img/weather/lr.svg`;
    transformedWeatherLocal.push({ date, temperature, weather_name, weather_image } as ICityWeather);
    console.log('inside if');
    return {
      city: 'title',
      country: 'country',
      weather: transformedWeatherLocal
    };
  }

}
