import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'app/service/autentication.service';
import { ProductService } from '../../service/product.service';
import { PedidoService } from '../../service/pedido.service';
import { Pedido } from 'app/models/interfacePedido';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  ordersNo : Pedido[] = null

  constructor(
   public PedidoService:PedidoService,
  ) { }

  public orders = [
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

  public viewOrdersNo : Pedido[] 
  public viewOrderSale : Pedido[] 

  public ordesrTotal = this.orders.length

  ngOnInit() {
    this.getNoAtent()
  }

  plusOrders(){
    if(this.viewOrdersNo.length == 1) 
    this.viewOrdersNo = this.ordersNo
    else 
    this.viewOrdersNo = this.ordersNo.slice(0,1)
  }

  plusOrdersSale(){
    if(this.viewOrderSale.length == 1)
    this.viewOrderSale = this.ordersNo
    else
    this.viewOrderSale = this.ordersNo.slice(0,1)
   }


    

   async getNoAtent(){
    await this.PedidoService.getOrders('sin atender').then((orders)=>{
      orders.snapshotChanges().subscribe((res)=>{
        this.ordersNo = res.map((item)=>{
          const odersFirebase = item.payload.doc.data() as Pedido
          odersFirebase.id = item.payload.doc.id
          console.log(odersFirebase);
          
          return odersFirebase
        })
        this.viewOrdersNo = this.ordersNo.slice(0,1)
      })
    })
   }

}
