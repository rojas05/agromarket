import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersalesPageRoutingModule } from './ordersales-routing.module';

import { OrdersalesPage } from './ordersales.page';
import { InputModule } from 'app/components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    OrdersalesPageRoutingModule
  ],
  declarations: [OrdersalesPage]
})
export class OrdersalesPageModule {}
