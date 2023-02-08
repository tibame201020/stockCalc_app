import { StrategyResult, StrategySummary } from './../models/Strategy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinmindService {

  constructor(private http: HttpClient) { }

  getStrategySummary():Observable<StrategySummary[]>{
    return this.http.get<StrategySummary[]>(environment.apiUrl + '/finmind/getStrategySummary');
  }

  getStrategyResult(strategyName:string):Observable<StrategyResult[]>{
    return this.http.post<StrategyResult[]>(environment.apiUrl + '/finmind/getStrategyResult', strategyName);
  }

  getStrategyResultByCode(code:string):Observable<StrategyResult[]>{
    return this.http.post<StrategyResult[]>(environment.apiUrl + '/finmind/getStrategyResultByCode', code);
  }

}
