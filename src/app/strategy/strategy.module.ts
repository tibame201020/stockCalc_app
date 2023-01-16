import { NgModule } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareModule } from '../share/share/share.module';

@NgModule({
  declarations: [SummaryComponent, BackTestingComponent],
  imports: [ShareModule],
})
export class StrategyModule {}
