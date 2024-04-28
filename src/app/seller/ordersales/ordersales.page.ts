import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../service/pedido.service';
import { Pedido } from 'app/models/interfacePedido';
import { Product } from 'app/models/interfaceProduct';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { Client, Seller } from 'app/models/interfaceUser';
import { UserService } from '../../service/user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-ordersales',
  templateUrl: './ordersales.page.html',
  styleUrls: ['./ordersales.page.scss'],
})
export class OrdersalesPage implements OnInit {
  public orderId : string
  public order: Pedido = null
  public product: Product = null
  public seller:Seller = null
  public client:Client = null
  Observable = this.order

  constructor(
    private ActivatedRoute : ActivatedRoute,
    private PedidoService: PedidoService,
    private ProductService: ProductService,
    private UserService: UserService
  ) {
    this.orderId = this.ActivatedRoute.snapshot.paramMap.get('id')
    this.get()
   }

  ngOnInit() {
    
  }

  async get(){
    console.log(this.orderId);
    
    await this.PedidoService.getOrder(this.orderId).then(async(order)=>{
      await order.snapshotChanges().subscribe((res)=>{
        this.order = res.payload.data() as Pedido
        this.order.id = res.payload.id
        this.getProduct()
      }) 
   });
   
   
  }

  getProduct(){
    this.ProductService.getProductsClientDetail(this.order.producto).then((product)=>{  
      product.snapshotChanges().subscribe((res)=>{
        this.product = res.payload.data() as Product
        this.getClient()
      })
    })
  }

  getClient(){
    this.UserService.getClientUserDatesClient(this.order.cliente).then((client)=>{  
      client.snapshotChanges().subscribe((res)=>{
        this.client = res.payload.data() as Client
       console.log(this.client);
       this.getSeller()
      })
    })
  }

  getSeller(){
    this.UserService.getSellerUserDatesClient(this.order.vendedor).then((seller)=>{  
      seller.snapshotChanges().subscribe((res)=>{
        this.seller = res.payload.data() as Seller
       console.log(this.seller);
      })
    })
  }

  createDelivery(){

  }

}
