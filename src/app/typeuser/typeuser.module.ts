import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeuserPageRoutingModule } from './typeuser-routing.module';

import { TypeuserPage } from './typeuser.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    TypeuserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TypeuserPage]
})
export class TypeuserPageModule {


}
