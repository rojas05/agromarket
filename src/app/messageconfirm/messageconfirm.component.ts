import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Pedido } from 'app/models/interfacePedido';
import { PedidoService } from '../service/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageconfirm',
  templateUrl: './messageconfirm.component.html',
  styleUrls: ['./messageconfirm.component.scss'],
})
export class MessageconfirmComponent  implements OnInit {
  @Input() pedido : Pedido
  isOpen = true
  
  constructor(
    public ModalController : ModalController,
    public PedidoService : PedidoService,
    public router :Router,
    public loadingControler: LoadingController,
  ) { }

  ngOnInit() {}
 

  async yesDelivery(){
    const loading = await this.loadingControler.create()
    await loading.present()
    var err = false
    this.PedidoService.registerNewProducto(this.pedido).then((res)=>{
      console.log(res);
    }).catch((Error)=>{
      console.log(Error);
      loading.dismiss()
      this.router.navigate(['/mainclient'])
      err = true
    }).finally(()=>{
      if(err == false){
        this.router.navigate(['/shopping']) 
      }
      loading.dismiss()
      this.ModalController.dismiss()
    })
  }

  noDelivery(){
    this.isOpen = false
    this.ModalController.dismiss({pos: ""})
  }

}
