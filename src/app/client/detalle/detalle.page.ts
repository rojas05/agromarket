import { Component, OnInit } from '@angular/core';
import { SlideComponent } from 'app/components/slide/slide.component';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  public cantidad = 1
  constructor() { }

  ngOnInit() {
    
  }

  onPlus(){
    this.cantidad = this.cantidad + 1
  }

  onMinius(){
    if(this.cantidad != 1){
      this.cantidad = this.cantidad - 1
    }
    
  }

}
