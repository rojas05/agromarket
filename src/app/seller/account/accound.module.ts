import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccoundPageRoutingModule } from './accound-routing.module';

import { AccoundPage } from './accound.page';
import { InputModule } from '../../components/input/input.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    AccoundPageRoutingModule
  ],
  declarations: [AccoundPage]
})
export class AccoundPageModule {
  
}
