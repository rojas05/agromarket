import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageconfirmComponent } from './messageconfirm.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    MessageconfirmComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports : [
    MessageconfirmComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageconfirmModule { }
