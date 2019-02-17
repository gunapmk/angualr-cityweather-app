import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { IWeatherData, ICityWeather } from './models/IWeatherData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Weather App';
  cityDetails: IWeatherData;

  ngOnInit() {
  }

  constructor(
    private weatherService: WeatherService,
  ) { }
  getCityDetails(woeid) {
    /*
      CHALLENGE
       - pass the city id to service.getCityDetails(woeid)
    */
    this.weatherService.getCityDetails(woeid).subscribe(data => this.cityDetails = data);

    // console.log('city=> ' + this.cityDetails.city);
    // console.log('Country=> ' + this.cityDetails.country);
    // this.cityDetails.weather.forEach(function(obj){
    //   console.log('date=> ' + obj.date);
    //   console.log('temperature=> ' + obj.temperature);
    //   console.log('weather_name=> ' + obj.weather_name);
    //   console.log('weather_image=> ' + obj.weather_image);
    // });
  }
}
