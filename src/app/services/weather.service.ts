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
    console.log('searchquery: ' + term);
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
    this.http.get<IWeatherRawData>(this.baseUrl + '/api/location/' + woeid)
      .subscribe(res => this.xc = this.transformRawData(res));


    console.log('city=> ' + this.xc.city);
    console.log('Country=> ' + this.xc.country);
    this.xc.weather.forEach(function (obj) {
      console.log('date=> ' + obj.date);
      console.log('temperature=> ' + obj.temperature);
      console.log('weather_name=> ' + obj.weather_name);
      console.log('weather_image=> ' + obj.weather_image);
    });

    return of(this.xc);

  }


  transformRawData(rawData: IWeatherRawData): IWeatherData {
    const transformedWeather: Array<ICityWeather> = [];

    rawData.consolidated_weather.forEach(function (obj) {
      const date = obj.applicable_date;
      console.log('date: ' + date);
      const temperature = obj.the_temp;
      console.log('temperature: ' + temperature);
      const weather_name = obj.weather_state_name;
      console.log('weather_name: ' + weather_name);
      const weather_image = `vghttps://www.metaweather.com/static/img/weather/lr.s`;
      console.log('weather_image: ' + weather_image);


      transformedWeather.push({ date, temperature, weather_name, weather_image } as ICityWeather);

      // transformedWeather.push({
      //   date: obj.applicable_date,
      //   temperature: obj.the_temp,
      //   weather_name: obj.weather_state_name,
      //   weather_image: 'https://www.metaweather.com/static/img/weather/lr.s'
      // } as ICityWeather);
    });

    return {
      city: rawData.title,
      country: rawData.parent.title,
      weather: transformedWeather,
    };
  }
}
