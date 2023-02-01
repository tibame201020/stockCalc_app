import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeParam } from '../models/CodeParam';
import { StockData } from '../models/StockData';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getCodeNmList(key:string):Observable<string[]>{
    return this.http.post<string[]>(environment.apiUrl + '/stock/getCodeNmList',key);
  }

  getCompanyNmList(key: string): Observable<string[]> {
    return this.http.post<string[]>(environment.apiUrl + '/stock/getCompanyNmList', key);
  }

  getStockData(codeParam:CodeParam): Observable<StockData[]> {
    return this.http.post<StockData[]>(environment.apiUrl + '/stock/getStockData', codeParam);
  }
}
