import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePageRoutingModule } from './detalle-routing.module';

import { DetallePage } from './detalle.page';
import { SlideModule } from 'app/components/slide/slide.module';
import { InputModule } from 'app/components/input/input.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SlideModule,
    InputModule,
    DetallePageRoutingModule
  ],
  declarations: [DetallePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetallePageModule {}
