import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeParam } from '../models/CodeParam';
import { SimpleSheet } from '../models/SimpleSheet';
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

  getImmediateStock(code:string):Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/stock/getImmediateStock', code);
  }

  getFinancial(codeParam:CodeParam): Observable<any[]> {
    return this.http.post<any[]>(environment.apiUrl + '/stock/getFinancial', codeParam);
  }

  getSheetByCodeAndDateRange(codeParam: CodeParam): Observable<SimpleSheet[]> {
    return this.http.post<SimpleSheet[]>(environment.apiUrl + '/stock/getSheetByCodeAndDateRange', codeParam);
  }
}
