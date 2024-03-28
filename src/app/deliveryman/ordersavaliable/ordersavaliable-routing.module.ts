import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersavaliablePage } from './ordersavaliable.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersavaliablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersavaliablePageRoutingModule {}
