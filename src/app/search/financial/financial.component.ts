import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeParam } from 'src/app/models/CodeParam';
import { SimpleSheet } from 'src/app/models/SimpleSheet';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent implements OnInit {
  companyList: string[] = [];
  beginDate: any;
  endDate: any;
  simpleSheets: SimpleSheet[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  getDataStatus = false;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getCompanyList(value.keyword);
        this.getSheetByCodeAndDateRange();
      }
    });
  }

  getCompanyList(key: string) {
    if (key.length < 2) {
      return;
    }
    this.stockService.getCompanyNmList(key).subscribe((res) => {
      this.companyList = res;
    });
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
    this.getSheetByCodeAndDateRange();
  }

  getSheetByCodeAndDateRange() {
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

    this.stockService.getSheetByCodeAndDateRange(codeParam).subscribe((res) => {
      this.getDataStatus = false;
      if (res.length) {
        this.simpleSheets = res;
      } else {
        this.simpleSheets = [];
      }
    });
  }
}
