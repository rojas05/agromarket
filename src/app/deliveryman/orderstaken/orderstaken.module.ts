import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderstakenPageRoutingModule } from './orderstaken-routing.module';

import { OrderstakenPage } from './orderstaken.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderstakenPageRoutingModule
  ],
  declarations: [OrderstakenPage]
})
export class OrderstakenPageModule {}
