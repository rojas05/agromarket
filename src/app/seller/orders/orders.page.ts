import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'app/service/autentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(
   
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

  public viewOrders = this.orders.slice(0,1)
  public viewOrderSale = this.orders.slice(0,1)

  public ordesrTotal = this.orders.length

  ngOnInit() {
    
  }

  plusOrders(){
    if(this.viewOrders.length == 1) 
    this.viewOrders = this.orders
    else 
    this.viewOrders = this.orders.slice(0,1)
  }

  plusOrdersSale(){
    if(this.viewOrderSale.length == 1)
    this.viewOrderSale = this.orders
    else
    this.viewOrderSale = this.orders.slice(0,1)
   }



}
