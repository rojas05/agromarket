import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonMenuButton } from '@ionic/angular';

import { MainclientPageRoutingModule } from './mainclient-routing.module';

import { MainclientPage } from './mainclient.page';
import { SlideModule } from 'app/components/slide/slide.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainclientPageRoutingModule,
  ],
  declarations: [MainclientPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainclientPageModule {}
