import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateproducPageRoutingModule } from './updateproduc-routing.module';

import { UpdateproducPage } from './updateproduc.page';
import { InputModule } from 'app/components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    UpdateproducPageRoutingModule
  ],
  declarations: [UpdateproducPage]
})
export class UpdateproducPageModule {}
