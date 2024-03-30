import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatetypeuserPageRoutingModule } from './updatetypeuser-routing.module';

import { UpdatetypeuserPage } from './updatetypeuser.page';
import { InputComponent } from 'app/components/input/input.component';
import { InputModule } from 'app/components/input/input.module';

@NgModule({
  imports: [
    InputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatetypeuserPageRoutingModule
  ],
  declarations: [UpdatetypeuserPage]
})
export class UpdatetypeuserPageModule {}
