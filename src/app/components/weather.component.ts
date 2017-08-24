import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MyService} from '../services/my.service';
import { Http } from '@angular/http';

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  
    private static APPID = "8d3991f929a0ce48d8ad3410ede93671";
  
    @ViewChild('weatherForm') weatherForm: NgForm;
  
    weatherOfCities = [];
  
    private weatherSubscription: Subscription;
  
    constructor(private http: Http, private weather: MyService) { }
  
    ngOnInit() {
      this.weatherSubscription = this.weather.onWeather.subscribe(
        (data: WeatherData[]) => {
          console.log("from observable: ", data);
        }
      );
    }
  
    ngOnDestroy() {
      this.weatherSubscription.unsubscribe();
    }
  
    getWeather() {
  
      const cityName = this.weatherForm.value.cityName;
  
      const promise = this.weather.getWeather(cityName);
      promise.then((result: WeatherData[]) => {
        this.weatherOfCities = result;
      });
      promise.catch((error) => {
        console.error("error: ", error);
      })
    }
  }