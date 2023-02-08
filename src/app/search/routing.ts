import { Routes } from '@angular/router';
import { FinancialComponent } from './financial/financial.component';
import { PriceComponent } from './price/price.component';

const routes: Routes = [
  { path: 'price', component: PriceComponent },
  { path: 'financial', component: FinancialComponent },
  { path: '', redirectTo: 'price', pathMatch: 'full' },
];

export const SearchRouter = routes;
