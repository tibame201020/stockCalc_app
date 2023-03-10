import { StockService } from './../../services/stock.service';
import { StrategyResult, StrategySummary } from './../../models/Strategy';
import { MatDialog } from '@angular/material/dialog';
import { FinmindService } from './../../services/finmind.service';
import { Component, OnInit } from '@angular/core';
import { StrategySummaryComponent } from '../strategy-summary/strategy-summary.component';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  constructor(private finmindService:FinmindService, private dialog: MatDialog,private formBuilder: FormBuilder, private stockService:StockService) {}

  strategys:StrategySummary[] = [];
  stockCodeList:string[] = [];

  getStrategyResultStatus = false;
  getStrategyResultByCodeStatus = false;

  strategyResultsNormal:StrategyResult[] = [];
  strategyResultsByCode:StrategyResult[] = [];


  formGroup: FormGroup = this.formBuilder.group({
    strategy: [''],
    keyword:['']
  });

  ngOnInit(): void {
    this.getStrategySummary();
    this.formGroup.valueChanges.subscribe(value => {
      if (value.strategy) {
        this.getStrategyResult(value.strategy);
      }

      if (value.keyword) {
        this.getStockCodeList(value.keyword);
        this.getStrategyResultByCode(value.keyword);

      }
    })
  }

  getStockCodeList(key: string) {
    if (key.length < 2) {
      return;
    }
    this.stockService.getCodeNmList(key).subscribe((res) => {
      this.stockCodeList = res;
    });
  }

  getStrategyResult(strategy:string) {
    this.getStrategyResultStatus = true;
    this.finmindService.getStrategyResult(strategy).subscribe(
      res => {
        this.getStrategyResultStatus = false;
        this.strategyResultsNormal = res;
      }
    )
  }

  getStrategyResultByCode(code:string) {
    let stockCode = code.includes(':')?code.split(':')[0] :code;

    this.getStrategyResultByCodeStatus = true;
    this.finmindService.getStrategyResultByCode(stockCode).subscribe(
      res => {
        if (res) {
          this.strategyResultsByCode = res;
        }
        this.getStrategyResultByCodeStatus = false;
      }
    )
  }


  getStrategySummary() {
    this.finmindService.getStrategySummary().subscribe(
      res => {
        this.strategys = res;
      }
    )
  }

  openStrategySummary() {
    this.dialog.open(StrategySummaryComponent, {
      width: '80rem',
      minHeight: '10rem',
      maxHeight: '60rem',
      data: this.strategys,
    });
  }

}
