import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeParam } from 'src/app/models/CodeParam';
import { CompareTargetList, OptionMap, SimpleSheet } from 'src/app/models/SimpleSheet';
import { EchartLineData } from 'src/app/models/EchartLineData';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  companyList: string[] = [];
  beginDate: any;
  endDate: any;
  compareList: string[]=[];
  compareData:any[] = [];

  compareTargetList = CompareTargetList;
  nowTarget:OptionMap = {
    key:'eps',
    value:'基本每股盈餘'
  }

  constructor(private formBuilder: FormBuilder, private stockService: StockService) {
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getCompanyList(value.keyword);
      }
    });
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
    this.updateCompareData();
  }

  getCompanyList(key: string) {
    this.stockService.getCompanyNmList(key).subscribe(
      res => {
        this.companyList = res;
      }
    )
  }

  addCompareList() {
    if (this.compareList.includes(this.formGroup.value.keyword)) {
      Swal.fire({
        icon:'error',
        text:'比較列表中已經有了!'
      })
      return;
    }
    this.compareList.push(this.formGroup.value.keyword);
    this.formGroup.patchValue({
      keyword:''
    });
    this.updateCompareData();
  }

  removeCompareCompany(idx: number) {
    Swal.fire({
      title: '從比較列表中移除?',
      showCancelButton: true,
      confirmButtonText: 'confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.compareList.splice(idx, 1);
        if (this.companyList.length) {
          this.updateCompareData();
        } else {
          this.compareData = [];
        }
      }
    })
  }

  changeCompareTarget(optionMap:OptionMap) {
    this.nowTarget = optionMap;
    this.updateCompareData();
  }

  updateCompareData() {
    if (!this.compareList.length || !this.beginDate || !this.endDate) {
      return;
    }

    this.compareData = [];

    this.compareList.forEach((company) => {
      console.log(company)
      let code = company.includes(':') ? company.split(':')[0] : company;
      let codeParam: CodeParam = {
        code: code,
        beginDate: this.beginDate,
        endDate: this.endDate,
        year: '',
        season: ''
      }

      this.stockService.getSheetByCodeAndDateRange(codeParam).subscribe(
        res => {
          let data = {
            company:company,
            financial:res
          }
          this.compareData.push(data);
        }
      )
    })
  }

  wrapperEchart(compareData:any[]) {
    if (!compareData || !compareData.length) {
      return;
    }
    let echartLineData: EchartLineData = {
      xAxisData: [],
      echartLineNames: [],
      echartLineSeries: []
    };
    echartLineData.xAxisData = this.wrapperXAxisData(compareData[0].financial);
    compareData.forEach((e) => {
      echartLineData.echartLineNames.push(e.company?e.company:'' + ' ' + this.nowTarget.key);

    })

    console.log(echartLineData)

    return echartLineData;
  }

  wrapperXAxisData(financial:any):string[] {
    let xAxisData:string[] = [];
    financial.forEach((element:SimpleSheet)=> {
      xAxisData.push(element.financialSheetId.split(":")[1] + ":Q" + element.financialSheetId.split(":")[2])
    })

    return xAxisData;
  }
}
