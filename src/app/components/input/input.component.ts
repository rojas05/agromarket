import { Component, Input, OnInit, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputModule } from './input.module';
import { SignupPage } from 'app/signup/signup.page';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),  // replace name as appropriate
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  value : String

  @Input()
  Type!: string;

  @Input() 
  PlaceHolder!: string 

  @Input()
  Icon!: string

  @Input()
  Label!: String

  @Input()
  Text!: String

  @Input()
  Id!:string
  
  constructor() { }
  ngOnInit(): void {
   this.writeValue("uno")
  }

  writeValue(value: string): void {
    this.value = value ? value : 'kjsdfhfd'
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
