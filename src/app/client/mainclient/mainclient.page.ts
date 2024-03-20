import { Component, OnInit, ViewChild } from '@angular/core';
import { SlideComponent } from 'app/components/slide/slide.component';
import { Observable, interval, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-mainclient',
  templateUrl: './mainclient.page.html',
  styleUrls: ['./mainclient.page.scss'],
})
export class MainclientPage implements OnInit {

public img = {
  "img":[
    "../../../assets/img/market.png"
  ]
}

  public list = {
    "productos": [
      "Café",
      "Caña de azúcar",
      "Palma de aceite",
      "Arroz",
      "Plátano",
      "Banano",
      "Yuca",
      "Maíz",
      "Frutas (varias)",
      "Hortalizas (varias)",
      "Cacao",
      "Flores",
      "Carne bovina",
      "Leche",
      "Pollo",
      "Huevos",
      "Panela",
      "Azúcar",
      "Aceite de palma",
      "Algodón",
      "Aguacate",
      "Boniato",
      "Cebolla",
      "Frijol",
      "Mango",
      "Papa",
      "Piña",
      "Tomate",
      "Uchuva",
      "Zanahoria",
      "Carne de cerdo",
      "Pescado",
      "Trucha",
      "Tilapia",
      "Miel",
      "Quinua",
      "Amaranto",
      "Ajonjolí",
      "Tabaco",
      "Caucho",
      "Madera",
      "Flores exóticas",
      "Plantas medicinales",
      "Biocombustibles",
      "Cultivos orgánicos",
      "Productos de la acuicultura",
      "Artesanías",
      "Productos de la apicultura"
    ]
  }

  public newList = {
    "productosR":[
      this.list.productos[Math.floor(Math.random() * this.list.productos.length)]
    ]
  }

  public view = this.list.productos.slice(0,3)

  constructor() { }
  private alive: boolean = true;
  productoAleatorio?: String

 ramdon(){
    this.productoAleatorio =  this.list.productos[Math.floor(Math.random() * this.list.productos.length)]
    const source = interval(10000);
    source.pipe(
      takeWhile(() => this.alive)
    ).subscribe(() => {
      this.productoAleatorio = this.list.productos[Math.floor(Math.random() * this.list.productos.length)]
    });
}

  ngOnInit() {
    this.ramdon()
  }

  verMas(){
    if(this.view.length == 3)
    this.view = this.list.productos
    else
    this.view = this.list.productos.slice(0,3)
  }
  
}
