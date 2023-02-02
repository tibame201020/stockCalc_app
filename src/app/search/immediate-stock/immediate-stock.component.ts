import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockImmediateInfo } from 'src/app/models/StockImmediateInfo';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-immediate-stock',
  templateUrl: './immediate-stock.component.html',
  styleUrls: ['./immediate-stock.component.css']
})
export class ImmediateStockComponent implements OnInit {
  stockImmediateInfo!:StockImmediateInfo;
  stockImmediateInfoOdd!: StockImmediateInfo;
  
  constructor(
    public dialogRef: MatDialogRef<ImmediateStockComponent>,
    @Inject(MAT_DIALOG_DATA) public code:string,
    public dialog: MatDialog,
    private stockService: StockService,
  ) { }
  

  ngOnInit(): void {
    this.getImmediateStock();
  }

  getImmediateStock() {
    let code = this.code.includes(':') ? this.code.split(':')[0] : this.code;
    this.stockService.getImmediateStock(code).subscribe(
      res => {
        if (res) {
          this.stockImmediateInfo = res.stockImmediateInfo;
          this.stockImmediateInfoOdd = res.stockImmediateInfoOdd;
        } else {
          console.log('no data');
        }
      }
    )
  }
}
