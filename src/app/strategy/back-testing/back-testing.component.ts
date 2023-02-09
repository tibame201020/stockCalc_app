import { BackTesting } from './../../models/BackTesting';
import { StockService } from './../../services/stock.service';
import { StrategySummary, BackTestingParam } from './../../models/Strategy';
import { FinmindService } from './../../services/finmind.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-back-testing',
  templateUrl: './back-testing.component.html',
  styleUrls: ['./back-testing.component.css']
})
export class BackTestingComponent implements OnInit {

  beginDate: any;
  endDate: any;
  strategys:StrategySummary[] = [];

  stockCodeList:string[]=[];

  backTesting?:BackTesting;

  getDataStatus = false;

  constructor(private formBuilder:FormBuilder, private finmindService:FinmindService, private stockService:StockService) { }

  formGroup: FormGroup = this.formBuilder.group({
    strategy: ['', Validators.required],
    keyword:['', Validators.required],
    userFunds:[1000000, Validators.required],
  });

  getStrategySummary() {
    this.finmindService.getStrategySummary().subscribe(
      res => {
        this.strategys = res;
      }
    )
  }

  ngOnInit(): void {
    this.getStrategySummary();
    this.formGroup.valueChanges.subscribe(value => {
      if (value.keyword) {
        this.getStockCodeList(value.keyword);
      }
      if (this.formGroup.valid) {
        this.getBackTesting();
      }
    })
  }

  getBackTesting() {
    let code = this.formGroup.value.keyword.includes(':')
      ? this.formGroup.value.keyword.split(':')[0]
      : this.formGroup.value.keyword;

    let param:BackTestingParam = {
      strategyName: this.formGroup.value.strategy,
      stockCode: code,
      userFunds: this.formGroup.value.userFunds,
      beginDate: this.beginDate,
      endDate: this.endDate
    }
    this.getDataStatus = true;

    this.finmindService.getBackTesting(param).subscribe(
      res => {
        this.getDataStatus = false;
        if (res) {
          this.backTesting = res;
        } else {
          this.backTesting = undefined;
        }
      }
    )
  }

  getStockCodeList(key: string) {
    this.stockService.getCodeNmList(key).subscribe((res) => {
      this.stockCodeList = res;
    });
  }


  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;

    if (this.formGroup.valid) {
      this.getBackTesting();
    }
  }
}
