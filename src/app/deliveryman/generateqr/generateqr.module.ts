import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateqrPageRoutingModule } from './generateqr-routing.module';

import { GenerateqrPage } from './generateqr.page';

import { QrCodeModule } from 'ng-qrcode';
import { InputModule } from 'app/components/input/input.module';

@NgModule({
  imports: [
    InputModule,
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateqrPageRoutingModule
  ],
  declarations: [GenerateqrPage]
})
export class GenerateqrPageModule {}
