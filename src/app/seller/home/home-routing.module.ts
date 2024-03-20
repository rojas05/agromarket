import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SalesPageModule } from '../sales/sales.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'orders',
        loadChildren:() => import('../orders/orders.module').then(m=> m.OrdersPageModule)
      },
      {
        path: 'account',
        loadChildren:() => import('../account/accound.module').then(m => m.AccoundPageModule)
      },
      {
        path: 'sales',
        loadChildren:() => import('../sales/sales.module').then(m => m.SalesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
