import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeParam } from 'src/app/models/CodeParam';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  stockCodeList:string[] = [];
  beginDate:any;
  endDate:any;

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(private formBuilder: FormBuilder,private stockService:StockService) {

  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getStockCodeList(value.keyword);
        this.getStockInfo();
      }
    });
  }

  getStockCodeList(key:string) {
    this.stockService.getCodeNmList(key).subscribe(
      res => {
        this.stockCodeList = res;
      }
    )
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
    this.getStockInfo();
  }

  getStockInfo() {
    if (!this.formGroup.value.keyword || !this.beginDate || !this.endDate) {
      return;
    }

    let code = this.formGroup.value.keyword.includes(':') ? this.formGroup.value.keyword.split(':')[0] : this.formGroup.value.keyword;
    let codeParam: CodeParam = {
      code: code,
      beginDate: this.beginDate,
      endDate: this.endDate,
      year: '',
      season: ''
    }

    this.stockService.getStockData(codeParam).subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
