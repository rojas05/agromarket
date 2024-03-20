import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersalesPage } from './ordersales.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersalesPageRoutingModule {}
