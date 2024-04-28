import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./seller/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splah',
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
    path: 'detalle/:id',
    loadChildren: () => import('./client/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./client/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./client/shopping/shopping.module').then( m => m.ShoppingPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./client/scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'maindelivery',
    loadChildren: () => import('./deliveryman/maindelivery/maindelivery.module').then( m => m.MaindeliveryPageModule)
  },
  {
    path: 'ordersavaliable',
    loadChildren: () => import('./deliveryman/ordersavaliable/ordersavaliable.module').then( m => m.OrdersavaliablePageModule)
  },
  {
    path: 'orderstaken',
    loadChildren: () => import('./deliveryman/orderstaken/orderstaken.module').then( m => m.OrderstakenPageModule)
  },
  {
    path: 'income',
    loadChildren: () => import('./deliveryman/income/income.module').then( m => m.IncomePageModule)
  },
  {
    path: 'ordersavaliabledetail',
    loadChildren: () => import('./deliveryman/ordersavaliabledetail/ordersavaliabledetail.module').then( m => m.OrdersavaliabledetailPageModule)
  },
  {
    path: 'orderstakendetail',
    loadChildren: () => import('./deliveryman/orderstakendetail/orderstakendetail.module').then( m => m.OrderstakendetailPageModule)
  },
  {
    path: 'generateqr',
    loadChildren: () => import('./deliveryman/generateqr/generateqr.module').then( m => m.GenerateqrPageModule)
  },
  {
    path: 'updatetypeuser',
    loadChildren: () => import('./updatetypeuser/updatetypeuser.module').then( m => m.UpdatetypeuserPageModule)
  },
  {
    path: 'generateqrcode',
    loadChildren: () => import('./client/generateqrcode/generateqrcode.module').then( m => m.GenerateqrcodePageModule)
  },
  {
    path: 'splah',
    loadChildren: () => import('./splah/splah.module').then( m => m.SplahPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
