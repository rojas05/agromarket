import { Component, OnInit, ViewChild } from '@angular/core';
import { SlideComponent } from 'app/components/slide/slide.component';
import { Product } from 'app/models/interfaceProduct';
import { ProductService } from 'app/service/product.service';
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

public products: Product[]

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

  public view : Product[] = []

  constructor(
    public productService : ProductService
  ) { }
  private alive: boolean = true;
  productoAleatorio?: Product = null

 ramdon(){
    this.productoAleatorio =  this.products[Math.floor(Math.random() * this.products.length)]
    const source = interval(10000);
    source.pipe(
      takeWhile(() => this.alive)
    ).subscribe(() => {
      this.productoAleatorio =this.products[Math.floor(Math.random() * this.products.length)]
    });
}

  ngOnInit() {
    this.get()
    
  }

  verMas(){
    if(this.view.length == 3)
    this.view = this.products
    else
    this.view = this.products.slice(0,3)
  }

  async get(){

    this.productService.getProductsClient().then((products)=>{  
      products.snapshotChanges().subscribe((res)=>{
        this.products = res.map((item) => {
          const productsFirebase = item.payload.doc.data() as Product;
          productsFirebase.id = item.payload.doc.id
          return productsFirebase
        });
        this.view = this.products.slice(0,3)
        this.ramdon()
      })
    }).catch((Error)=>{
      console.log(Error);
      
    })
   }



  
}
