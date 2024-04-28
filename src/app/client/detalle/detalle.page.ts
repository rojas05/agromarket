import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideComponent } from 'app/components/slide/slide.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/interfaceProduct';
import { Client, Seller, Ubicacion } from '../../models/interfaceUser';
import { UserService } from '../../service/user.service';
import { User, user } from '@angular/fire/auth';
import { IonModal, ModalController, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglemapsComponent } from 'app/googlemaps/googlemaps.component';
import { CountService } from 'app/googlemaps/count.service';
import { MessageconfirmComponent } from 'app/messageconfirm/messageconfirm.component';
import { Pedido } from 'app/models/interfacePedido';
import { AutenticationService } from 'app/service/autentication.service';
import { DOCUMENT } from '@angular/common';
import { GooglemapsService } from 'app/googlemaps/googlemaps.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  public productoId
  public product : Product = null
  public seller : Seller = null
  public Client : Client = null
  public cantidad = 1
  public total: number
  public clientId: string
  isToastOpen = false
  cordenadas : Ubicacion = null
  costDelivery : number = null

  pedidoForm = this.formBuilder.group({
    cantidad : [this.cantidad,[Validators.required]],
    message : ['',[Validators.required,Validators.minLength(5)]],
    delivery : ['',[Validators.required]],
  })

  constructor(
    private rutaService: CountService,
    private modalController: ModalController,
    public formBuilder:FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    public autService: AutenticationService,
    private loadingControler : LoadingController,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private GooglemapsService: GooglemapsService,
    public ModalController: ModalController
  ) { 
    autService.getProfile().then((user)=>{
      this.clientId = user.uid as string
    })
    this.getClientDates() 
  }

  ngOnInit() {
    this.productoId = this.activatedRoute.snapshot.paramMap.get('id')
    this.get()
  }

  onPlus(){
    if(this.cantidad < this.product.cantidad)
    this.cantidad = this.cantidad + 1
    this.total = this.cantidad * this.product.precio
  }

  onMinius(){
    if(this.cantidad > 1){
      this.cantidad = this.cantidad - 1
      this.total = this.cantidad * this.product.precio
    }
    
  }

  get(){
    this.productService.getProductsClientDetail(this.productoId).then((product)=>{  
      product.snapshotChanges().subscribe((res)=>{
        this.product = res.payload.data() as Product
        this.product.id = res.payload.id
        this.getSellerDates(this.product.vendedor)
        this.total = this.product.precio
      })
    })
  }

  getSellerDates(sellerId : string){
    this.userService.getSellerUserDatesClient(sellerId).then((seller)=>{  
      seller.snapshotChanges().subscribe((res)=>{
        this.seller = res.payload.data() as Seller
      })
    })
  }

  getClientDates(){
    this.userService.getDatesClient().then((client)=>{  
      client.snapshotChanges().subscribe((res)=>{
        this.Client = res.payload.data() as Client
        this.cordenadas = this.Client.ubicacion
      })
    })
  }


  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async addDirection() {
    this.cordenadas = this.Client.ubicacion
    let positionInput = {  
      lat: 0,
      lng: 0,
    };
    if (this.cordenadas !== null) {
        positionInput = this.cordenadas; 
    }

    const modalAdd  = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      componentProps: {position: positionInput}
    });
    await modalAdd.present();

    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
     this.cordenadas = data.pos
    }

  }

initGoogle(){
  this.GooglemapsService.init(this.renderer, this.document).then( () => {
    this.calculateDeliveryCosts();
}).catch( (err) => {    
    console.log(err);
});
}


  calculateDeliveryCosts()  {
    if(this.cordenadas != null){
      if(this.pedidoForm.valid){
        (async () => {
          try {
            const loading = await this.loadingControler.create()
            await loading.present()
            const resultado = await this.rutaService.calcularRutaDistancia(this.cordenadas,this.seller.ubicacion);
            if(resultado.distanciaKm > 20){
              var result = resultado.distanciaKm * 400
              var resultInt = Math.trunc(result)
              this.costDelivery = this.priceInt(String(resultInt))
              loading.dismiss()
              this.createDelivery()
            } else{
              var result = resultado.distanciaKm * 300
              var resultInt = Math.trunc(result)
              this.costDelivery = this.priceInt(String(resultInt))
              loading.dismiss()
              this.createDelivery()
            }
          } catch (error) {
            console.error(error);
          }
        })();
      }else{
        this.setOpen(true)
      }
    } else {
      this.setOpen(true)
    }
  }

  priceInt(price: string){
    var number1 = price[price.length - 1]
    var number2 = price[price.length - 2]
    var numbers = String(number2) + String(number1)
    var minius = Number(price) - Number(numbers)

    if(minius >= 50){
      return minius + 100
    }else{
      return minius
    }
  }

  async createDelivery(){
    var date = this.obtenerFechaActual()
    console.log(date);
    if(this.pedidoForm.value.delivery == "no"){
      this.costDelivery = 0
    }
    this.total = this.total + this.costDelivery

    var pedido: Pedido = {
      producto : this.product.id,
      domicilio: this.pedidoForm.value.delivery,
      cliente: this.clientId,
      vendedor: this.product.vendedor,
      cantidad: this.cantidad,
      valorUnidad: this.product.precio,
      valorTotal: this.total,
      valorDomicilio: this.costDelivery,
      descripcion: this.product.nombre,
      fecha: date,
      message:this.pedidoForm.value.message,
      estado:"sin atender" 
    }

    console.log(pedido);
    
    const modalAdd  = await this.modalController.create({
      component: MessageconfirmComponent,
      componentProps: {pedido: pedido}
    });
    await modalAdd.present();
  }


  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Months start from 0
    const dia = fechaActual.getDate();
  
    // Format with leading zeros for day and month (0-padded)
    const formattedMonth = mes.toString().padStart(2, '0');
    const formattedDay = dia.toString().padStart(2, '0');
  
    return `${anio}-${formattedMonth}-${formattedDay}`;
  }
}
  

  

