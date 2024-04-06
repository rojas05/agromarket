import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Client, Seller, Delivery, SellerIndication } from '../models/interfaceUser';
import { UserService } from 'app/service/user.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router, UrlSegment } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from '../service/storage.service';
import { register } from 'swiper/element';
import { saveAs as fileSaverSave } from 'file-saver'
import { toDataURL, toFile } from 'qrcode';
 

@Component({
  selector: 'app-typeuser',
  templateUrl: './typeuser.page.html',
  styleUrls: ['./typeuser.page.scss'],
})


export class TypeuserPage implements OnInit {
  openModal = "open1"

  @ViewChild(IonModal) modal: IonModal;

  imageSelect1 = '../../assets/img/casa.png'
  imageSelect2 = '../../assets/img/entrada.png'
  imageSelect3 = '../../assets/img/referencia.png'

  dataUrls: File[];
  fileNames: string[];
  messageToast:string
  isToastOpen = false;

  vendedorForm = this.FormBuilder.group({
    finca : ['',[Validators.required,Validators.minLength(3)]],
    direccionEs : ['',[Validators.required, Validators.minLength(15)]],
  })

  compradorForm = this.FormBuilder.group({
    direccionEs : ['',[Validators.required, Validators.minLength(15)]],
  })

  repartidorForm = this.FormBuilder.group({
    rutas : ['',[Validators.required, Validators.minLength(10)]],
  })

  constructor(
    public FormBuilder:FormBuilder,
    public userService:UserService,
    public storageService:StorageService,
    public loadingControler: LoadingController, 
    public router :Router,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    Camera.checkPermissions()
  }

  getErrorNameMessage(){
    if(this.vendedorForm.controls.finca.hasError('required')){
      return 'el nombre es requerido* ejem: granja el pollon'
    }
    return ""
  }


  async insetTypeUserVendedor(){
    if(this.vendedorForm.valid){
      this.verifyPhotos(this.vendedorForm.value.finca, this.vendedorForm.value.direccionEs)
    }else{
      this.setOpenToast(true,"fomulario incorrecto")
    }
  }

  async insetTypeUserComprador(){
    if(this.compradorForm.valid){
      const loading = await this.loadingControler.create()
      await loading.present()
      const newUserType: Client = {
        direccion : this.compradorForm.value.direccionEs
      }
    await this.userService.registerUserComprador(newUserType).catch((Error)=>{
      console.log(Error);
      loading.dismiss()
      this.router.navigate(['/typeUser'])
    }).finally(()=>{
      this.router.navigate(['/mainclient'])
      loading.dismiss()
    })  
    }
  }

  async insetTypeUserRepartidor(){
    if(this.repartidorForm.valid){
      const loading = await this.loadingControler.create()
      await loading.present()
      const newUserType: Delivery = {
        rutas : this.repartidorForm.value.rutas
      }
    await this.userService.registerUserRepartidor(newUserType).catch((Error)=>{
      console.log(Error);
      loading.dismiss()
      this.router.navigate(['/typeUser'])
    }).finally(()=>{
      this.router.navigate(['/maindelivery'])
      loading.dismiss()
    })  
    }
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

  async buscarGaleria():Promise<string>{
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        resultType:CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      return image.dataUrl
  }


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
  

  verifyPhotos(name:string,indication:string){ 
    this.dataUrls = [this.dataUrlToFile(this.imageSelect1,"1"), this.dataUrlToFile(this.imageSelect2,"2"), this.dataUrlToFile(this.imageSelect3,"3")];
    this.fileNames = ['imagen1.png', 'imagen2.png', 'imagen3.png'];
    this.uploadFiles(name,indication)
  }

  async uploadFiles(name:string,indication:string) {
    console.log("subiendo")
   await this.storageService.uploadMultipleFiles(this.dataUrls, this.fileNames,name,indication)
    
  }     
  
  setOpenToast(isOpen: boolean,message:string) {
    this.isToastOpen = isOpen;
    this.messageToast = message
  } 
}




