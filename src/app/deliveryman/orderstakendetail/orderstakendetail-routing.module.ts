import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderstakendetailPage } from './orderstakendetail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderstakendetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderstakendetailPageRoutingModule {}
