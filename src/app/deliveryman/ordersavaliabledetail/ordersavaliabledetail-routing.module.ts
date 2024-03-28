import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersavaliabledetailPage } from './ordersavaliabledetail.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersavaliabledetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersavaliabledetailPageRoutingModule {}
