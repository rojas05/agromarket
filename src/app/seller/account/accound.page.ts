import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accound',
  templateUrl: './accound.page.html',
  styleUrls: ['./accound.page.scss'],
})
export class AccoundPage implements OnInit {


  public productos = [
    {
      id: 1,
      name: 'platano',
      img: "https://static.libertyprim.com/files/familles/banane-large.jpg?1569271725"
    },
    {
      id: 2,
      name: 'maiz',
      img:"https://s1.eestatic.com/2020/01/10/ciencia/nutricion/maiz-cereales-nutricion_458715971_142137584_1706x960.jpg"
    },
    {
      id: 3,
      name: 'platano',
      img: "https://static.libertyprim.com/files/familles/banane-large.jpg?1569271725"
    },
    {
      id: 4,
      name: 'maiz',
      img:"https://s1.eestatic.com/2020/01/10/ciencia/nutricion/maiz-cereales-nutricion_458715971_142137584_1706x960.jpg"
    }
    
  ];

  public viewProductos = this.productos.slice(0,1)
  public viewAgotados = this.productos.slice(0,1)
  public viewInactivos = this.productos.slice(0,1)

  constructor() {  }

  ngOnInit() {
    
  }

  plusSales(){
    if(this.viewProductos.length == 1) 
    this.viewProductos = this.productos
    else 
    this.viewProductos = this.productos.slice(0,1)
  }

  plusAgotados(){
    if(this.viewAgotados.length == 1)
    this.viewAgotados = this.productos
    else
    this.viewAgotados = this.productos.slice(0,1)
   }

   plusInactivos(){
    if(this.viewInactivos.length == 1)
    this.viewInactivos = this.productos
    else
    this.viewInactivos = this.productos.slice(0,1)
   }
}
