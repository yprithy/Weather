import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { WeatherData } from '../components/weather.component';


@Injectable()
export class MyService {
    queryEvent: any;

  private static APPID = "8d3991f929a0ce48d8ad3410ede93671";

  onWeather = new Subject<WeatherData[]>();

  
  constructor(private http: Http) { }

  public getWeather2(city: string): Observable<Response> {

    let result: Observable<Response> =
      this.http.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: MyService.APPID
        }
      });
    return (result);
  }

  public getWeather(city: string): Promise<WeatherData[]> {
    const p = new Promise<WeatherData[]>((resolve, reject) => {
      this.http.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: MyService.APPID
        }
      }).subscribe(
        (result) => {
          const weaterData = result.json().weather;
          resolve(weaterData);
          this.onWeather.next(weaterData);
        },
        (error) => { reject(error); }
      );
    });

    return (p);
  }

}