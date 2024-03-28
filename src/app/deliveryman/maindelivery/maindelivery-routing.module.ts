import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaindeliveryPage } from './maindelivery.page';

const routes: Routes = [
  {
    path: '',
    component: MaindeliveryPage,
    children: [
      {
        path: 'ordersAvaliable',
        loadChildren:() => import('../ordersavaliable/ordersavaliable.module').then(m=> m.OrdersavaliablePageModule)
      },
      {
        path: 'ordersTaken',
        loadChildren:() => import('../orderstaken/orderstaken.module').then(m => m.OrderstakenPageModule)
      },
      {
        path: 'income',
        loadChildren:() => import('../income/income.module').then(m => m.IncomePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaindeliveryPageRoutingModule {}
