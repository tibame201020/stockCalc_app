import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeParam } from 'src/app/models/CodeParam';
import { StockData } from 'src/app/models/StockData';
import { StockService } from 'src/app/services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ImmediateStockComponent } from '../immediate-stock/immediate-stock.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit {
  stockCodeList: string[] = [];
  beginDate: any;
  endDate: any;
  stockDatas: StockData[] = [];
  hasImmediateStock: boolean = false;

  getDataStatus = false;

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getStockCodeList(value.keyword);
        this.getStockInfo();
        this.getImmediateStock();
      }
    });
  }

  getStockCodeList(key: string) {
    if (key.length < 2) {
      return;
    }
    this.stockService.getCodeNmList(key).subscribe((res) => {
      this.stockCodeList = res;
    });
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

    let code = this.formGroup.value.keyword.includes(':')
      ? this.formGroup.value.keyword.split(':')[0]
      : this.formGroup.value.keyword;
    let codeParam: CodeParam = {
      code: code,
      beginDate: this.beginDate,
      endDate: this.endDate,
      year: '',
      season: '',
    };

    this.getDataStatus = true;

    this.stockService.getStockData(codeParam).subscribe((res) => {
      this.getDataStatus = false;
      if (res) {
        this.stockDatas = res;
      } else {
        this.stockDatas = [];
      }
    });
  }

  getImmediateStock() {
    if (!this.formGroup.value.keyword) {
      return;
    }

    let code = this.formGroup.value.keyword.includes(':')
      ? this.formGroup.value.keyword.split(':')[0]
      : this.formGroup.value.keyword;
    this.stockService.getImmediateStock(code).subscribe((res) => {
      if (res) {
        this.hasImmediateStock = true;
      } else {
        this.hasImmediateStock = false;
      }
    });
  }

  openImmediateStock() {
    const dialogRef = this.dialog.open(ImmediateStockComponent, {
      width: '70rem',
      minHeight: '30rem',
      maxHeight: '60rem',
      data: this.formGroup.value.keyword,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getStockInfo();
      this.getImmediateStock();
    });
  }
}
