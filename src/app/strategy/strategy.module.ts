import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { SummaryComponent } from './summary/summary.component';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';
import { StrategySummaryComponent } from './strategy-summary/strategy-summary.component';

@NgModule({
  declarations: [SummaryComponent, BackTestingComponent, StrategySummaryComponent],
  imports: [ShareshareComponetsModule],
})
export class StrategyModule {}
