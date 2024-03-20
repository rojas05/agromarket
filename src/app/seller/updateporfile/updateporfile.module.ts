import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateporfilePageRoutingModule } from './updateporfile-routing.module';

import { UpdateporfilePage } from './updateporfile.page';
import { InputModule } from '../../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    UpdateporfilePageRoutingModule
  ],
  declarations: [UpdateporfilePage]
})
export class UpdateporfilePageModule {}
