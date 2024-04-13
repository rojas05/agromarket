import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'app/models/interfaceProduct';
import { ProductService } from 'app/service/product.service';
import { UserService } from '../../service/user.service';
import { Seller } from 'app/models/interfaceUser';

@Component({
  selector: 'app-accound',
  templateUrl: './accound.page.html',
  styleUrls: ['./accound.page.scss'],
})
export class AccoundPage implements OnInit {

  public datesSeller: Seller
  public productos : Product[] = [];
  public productosFalce : Product[] = [];

  public viewProductos: Product[] = []
  public viewInactivos: Product[] = []

  constructor(
    public productService : ProductService,
    public userService : UserService
  ) {  }


  ngOnInit() {
    this.get()
    this.getNoActive()
    this.getDatesFinca()
  }

  plusProduct(){
    if(this.viewProductos.length == 1) 
    this.viewProductos = this.productos
    else 
    this.viewProductos = this.productos.slice(0,1)
  }

   plusInactivos(){
    if(this.viewInactivos.length == 1)
    this.viewInactivos = this.productosFalce
    else
    this.viewInactivos = this.productosFalce.slice(0,1)
   }

   async getDatesFinca(){
    this.userService.getSellerUserDates().then((products)=>{  
      products.snapshotChanges().subscribe((res)=>{
        this.datesSeller = res.payload.data() as Seller
      })
    })
   }


   async get(){
    this.productService.getProducts().then((products)=>{  
      products.snapshotChanges().subscribe((res)=>{
        this.productos = res.map((item) => {
          return item.payload.doc.data() as Product;
        });
        this.viewProductos = this.productos.slice(0,1)
      })
    }).catch((Error)=>{
      console.log(Error);
      
    })
   }

   async getNoActive(){
     this.productService.getProductsFalce(0).then((product=>{
      product.snapshotChanges().subscribe((res)=>{
          this.productosFalce = res.map((item)=>{
            return item.payload.doc.data() as Product
          })
          this.viewInactivos = this.productosFalce.slice(0,1)
      })
    })).catch((Error)=>{
      console.log(Error);
    })
    
   }
}
