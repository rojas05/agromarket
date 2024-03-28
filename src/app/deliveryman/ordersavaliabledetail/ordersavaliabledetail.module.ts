import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersavaliabledetailPageRoutingModule } from './ordersavaliabledetail-routing.module';

import { OrdersavaliabledetailPage } from './ordersavaliabledetail.page';
import { SlideModule } from 'app/components/slide/slide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideModule,
    OrdersavaliabledetailPageRoutingModule
  ],
  declarations: [OrdersavaliabledetailPage]
})
export class OrdersavaliabledetailPageModule {}
