import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersavaliablePageRoutingModule } from './ordersavaliable-routing.module';

import { OrdersavaliablePage } from './ordersavaliable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersavaliablePageRoutingModule
  ],
  declarations: [OrdersavaliablePage]
})
export class OrdersavaliablePageModule {}
