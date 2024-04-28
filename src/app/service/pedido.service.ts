import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductService } from './product.service';
import { Pedido } from 'app/models/interfacePedido';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AutenticationService } from './autentication.service';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    public Firestore: AngularFirestore, 
    private ProductService : ProductService,
    public router :Router,
    public service : AutenticationService
  ) { }


  async registerNewProducto (newOrder: Pedido){
    var err = false
    await this.ProductService.updateStock(newOrder.producto, newOrder.cantidad).catch((Error)=>{
      err = true
    })
    if(err == false){
      return await this.Firestore.collection('/orders').doc().set(newOrder)
    }else{
      return await this.router.navigate(['/mainclient'])
    }
    
  }

  async getOrders<tipo>(estado: string) {
    const idUser = (await this.service.getProfile()).uid
    const collection = this.Firestore.collection<tipo>(
      '/orders',
      ref => ref.where('estado', '==', estado) .where('vendedor', '==', idUser)
    )
    return collection
  }

  async getOrder(id:string) {
    return this.Firestore.collection('/orders').doc(id)
  }
}
