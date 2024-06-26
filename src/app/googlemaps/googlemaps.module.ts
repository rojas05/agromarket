import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component'


@NgModule({
  declarations: [
    GooglemapsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports : [
    GooglemapsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GooglemapsModule { }
