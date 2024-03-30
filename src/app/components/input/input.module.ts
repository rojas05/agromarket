import { NgModule, forwardRef } from "@angular/core";
import { InputComponent } from './input.component';
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormControlName, NG_VALUE_ACCESSOR } from "@angular/forms";

@NgModule({
    declarations:[InputComponent],
    imports: [CommonModule,IonicModule],
    exports: [InputComponent],
})

export class InputModule{}