import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { SummaryComponent } from './summary/summary.component';
import { PriceComponent } from './price/price.component';
import { FinancialComponent } from './financial/financial.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';

@NgModule({
  declarations: [
    SummaryComponent,
    PriceComponent,
    FinancialComponent
  ],
  imports: [ShareshareComponetsModule],
})
export class SearchModule {}
