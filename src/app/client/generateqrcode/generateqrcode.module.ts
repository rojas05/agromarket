import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateqrcodePageRoutingModule } from './generateqrcode-routing.module';

import { GenerateqrcodePage } from './generateqrcode.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    QrCodeModule,
    FormsModule,
    IonicModule,
    GenerateqrcodePageRoutingModule
  ],
  declarations: [GenerateqrcodePage]
})
export class GenerateqrcodePageModule {}
