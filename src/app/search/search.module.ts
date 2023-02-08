import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { PriceComponent } from './price/price.component';
import { FinancialComponent } from './financial/financial.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';
import { ImmediateStockComponent } from './immediate-stock/immediate-stock.component';

@NgModule({
  declarations: [PriceComponent, FinancialComponent, ImmediateStockComponent],
  imports: [ShareshareComponetsModule],
})
export class SearchModule {}
