import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderstakenPage } from './orderstaken.page';

const routes: Routes = [
  {
    path: '',
    component: OrderstakenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderstakenPageRoutingModule {}
