import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { toDataURL } from 'qrcode';
import { StorageService } from '../../service/storage.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/interfaceProduct';
import { UserService } from '../../service/user.service';
import { map } from 'rxjs';
import { Seller, User } from 'app/models/interfaceUser';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  openModal = "open1"
  isToastOpen = false;
  dataUrls: File[];
  fileNames: string[];
  city: string = ""
  
  imageSelect1 = '../../assets/img/casa.png'
  imageSelect2 = '../../assets/img/entrada.png'

  prodctForm = this.formBuilder.group({
    product : ['',[Validators.required,Validators.minLength(5)]],
    description : ['',[Validators.required,Validators.minLength(12)]],
    cantidad : ['',[Validators.required]],
    price: ['',[Validators.required,Validators.minLength(3)]],
    categoria: ['',[Validators.required,Validators.minLength(5)]]
  })
  constructor(
    public userService:UserService,
    public formBuilder:FormBuilder, 
    public loadingControler: LoadingController, 
    public router:Router,
    public productService: ProductService) { }

  ngOnInit() {
    Camera.checkPermissions()
    this.getMunicipioUser()
  }

  async insertDatesProduct(){
    if(this.prodctForm.valid){
      this.verifyPhotos()
    }else{
      this.setOpen(true)
    }
}



//recursos para las fotos 

async buscarGaleria():Promise<string>{
  const image = await Camera.getPhoto({
    quality: 60,
    allowEditing: false,
    resultType:CameraResultType.DataUrl,
    source: CameraSource.Photos
  });

  return image.dataUrl
}

async tomarFoto():Promise<string>{
    
  const image = await Camera.getPhoto({
    quality: 60,
    allowEditing: false,
    resultType:CameraResultType.DataUrl,
    source: CameraSource.Camera
  });

  return image.dataUrl
}

dataUrlToFile(dataUrl: string, fileName: string): File {
const base64Data = dataUrl.split(',')[1];
const binaryString = atob(base64Data);
const arrayBuffer = new ArrayBuffer(binaryString.length);
const uint8Array = new Uint8Array(arrayBuffer);
for (let i = 0; i < binaryString.length; i++) {
  uint8Array[i] = binaryString.charCodeAt(i);
}
const blob = new Blob([uint8Array], { type: 'image/png' });
const file = new File([blob], fileName, { type: 'image/png' });
return file;
}

//fin de recursos para fotos y camara 

//recursos para dialogo

camera() {
  this.modal.dismiss(null, 'foto');
}

galeri() {
  this.modal.dismiss(null, 'galeria');
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if(ev.detail.role === 'foto'){
    if(this.openModal == 'open1'){
      this.foto1()
    }else if(this.openModal == 'open2'){
      this.foto2()
    }
  } else if(ev.detail.role === 'galeria'){
    if(this.openModal == 'open1'){
      this.galeria1()
    }else if(this.openModal == 'open2'){
      this.galeria2()
    }
  }
}

async foto1(){
  this.imageSelect1 = (await this.tomarFoto()).toString()
  this.openModal = "open2"
}

async foto2(){
  this.imageSelect2 = (await this.tomarFoto()).toString()
  this.openModal = "open1"
}

async galeria1(){
  this.imageSelect1 = (await this.buscarGaleria()).toString()
  this.openModal = "open2"
}

async galeria2(){
  this.imageSelect2 = (await this.buscarGaleria()).toString()
  this.openModal = "open1"
}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  //verificando los recursos y preparandolo para la insercion

  verifyPhotos(){ 
    this.dataUrls = [this.dataUrlToFile(this.imageSelect1,"1"), this.dataUrlToFile(this.imageSelect2,"2")];
    this.fileNames = ['imagen1.png', 'imagen2.png'];
    this.uploadFiles()
  }

  async uploadFiles() {
    const newProduct : Product = {
      nombre : this.prodctForm.value.product,
      descripcion : this.prodctForm.value.description,
      cantidad : Number(this.prodctForm.value.cantidad),
      precio : Number(this.prodctForm.value.price),
      categoria : this.prodctForm.value.categoria,
      mercado : this.city,
      img : this.fileNames,
      vendedor : ""
    }
    console.log("subiendo")
   await this.productService.uploadMultipleFiles(this.dataUrls, this.fileNames,newProduct).finally(()=>{
    this.dataUrls = []
    this.fileNames = []
   })

  }  

 
  
  getMunicipioUser(){
    this.userService.getUserDates().then((product=>{
      product.snapshotChanges().subscribe((res)=>{
          console.log(res.payload.data());
          const sellerData = res.payload.data() as User
          this.city = sellerData.municipio
      })
    })).catch((Error)=>{
      console.log(Error);
    })
  }
}

