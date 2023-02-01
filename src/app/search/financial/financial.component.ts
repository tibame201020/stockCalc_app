import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {

  companyList: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(private formBuilder: FormBuilder, private stockService: StockService) {

  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getCompanyList(value.keyword);
      }
    });
  }

  getCompanyList(key: string) {
    this.stockService.getCompanyNmList(key).subscribe(
      res => {
        this.companyList = res;
      }
    )
  }

}
