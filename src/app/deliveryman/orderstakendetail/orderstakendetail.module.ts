import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderstakendetailPageRoutingModule } from './orderstakendetail-routing.module';

import { OrderstakendetailPage } from './orderstakendetail.page';
import { SlideModule } from 'app/components/slide/slide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideModule,
    OrderstakendetailPageRoutingModule
  ],
  declarations: [OrderstakendetailPage]
})
export class OrderstakendetailPageModule {}
