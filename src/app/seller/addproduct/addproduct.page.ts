import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  isToastOpen = false;

  openModal = "open1"

  imageSelect1 = '../../assets/img/casa.png'
  imageSelect2 = '../../assets/img/entrada.png'
  imageSelect3 = '../../assets/img/referencia.png'

  prodctForm = this.formBuilder.group({
    product : ['',[Validators.required,Validators.minLength(5)]],
    description : ['',[Validators.required,Validators.minLength(12)]],
    cantidad : ['',[Validators.required]],
    price: ['',[Validators.required,Validators.minLength(3)]],
    categoria: ['',[Validators.required,Validators.minLength(5)]]
  })
  constructor(
    public formBuilder:FormBuilder, 
    public loadingControler: LoadingController, 
    public router:Router) { }

  ngOnInit() {
    Camera.checkPermissions()
  }

  async insertDatesProduct(){
    if(this.prodctForm.valid){
      const loading = await this.loadingControler.create()
      await loading.present()
      
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

//recirsos para dialogo

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
    }else if(this.openModal == 'open3'){
      this.foto3()
    }
  } else if(ev.detail.role === 'galeria'){
    if(this.openModal == 'open1'){
      this.galeria1()
    }else if(this.openModal == 'open2'){
      this.foto2()
    }else if(this.openModal == 'open3'){
      this.foto3()
    }
  }
}

async foto1(){
  this.imageSelect1 = (await this.tomarFoto()).toString()
  this.openModal = "open2"
}

async foto2(){
  this.imageSelect2 = (await this.tomarFoto()).toString()
  this.openModal = "open3"
}

async foto3(){
  this.imageSelect3 = (await this.tomarFoto()).toString()
  this.openModal = "open1"
}



async galeria1(){
  this.imageSelect1 = (await this.buscarGaleria()).toString()
  this.openModal = "open2"
}

async galeria2(){
  this.imageSelect2 = (await this.buscarGaleria()).toString()
  this.openModal = "open3"
}

async galeria3(){
  this.imageSelect3 = (await this.buscarGaleria()).toString()
  this.openModal = "open1"
}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
