import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
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
  
  constructor() { }

}
