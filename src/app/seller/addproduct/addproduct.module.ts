import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddproductPageRoutingModule } from './addproduct-routing.module';

import { AddproductPage } from './addproduct.page';
import { InputModule } from 'app/components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    IonicModule,
    AddproductPageRoutingModule,
  ],
  declarations: [AddproductPage]
})
export class AddproductPageModule {}
