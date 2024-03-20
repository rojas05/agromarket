import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./seller/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'mainclient',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'typeuser',
    loadChildren: () => import('./typeuser/typeuser.module').then( m => m.TypeuserPageModule)
  },
  {
    path: 'accound',
    loadChildren: () => import('./seller/account/accound.module').then( m => m.AccoundPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./seller/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./seller/addproduct/addproduct.module').then( m => m.AddproductPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./seller/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'ordersales/:id',
    loadChildren: () => import('./seller/ordersales/ordersales.module').then( m => m.OrdersalesPageModule)
  },
  {
    path: 'updateproduc/:id',
    loadChildren: () => import('./seller/updateproduc/updateproduc.module').then( m => m.UpdateproducPageModule)
  },
  {
    path: 'updateporfile',
    loadChildren: () => import('./seller/updateporfile/updateporfile.module').then( m => m.UpdateporfilePageModule)
  },
  {
    path: 'mainclient',
    loadChildren: () => import('./client/mainclient/mainclient.module').then( m => m.MainclientPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./client/detalle/detalle.module').then( m => m.DetallePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
