import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { PriceComponent } from './price/price.component';
import { FinancialComponent } from './financial/financial.component';

@NgModule({
  declarations: [
    SummaryComponent,
    PriceComponent,
    FinancialComponent
  ],
  imports: [CommonModule],
})
export class SearchModule {}
