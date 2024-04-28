import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Client, Seller, Delivery, SellerIndication, Ubicacion } from '../models/interfaceUser';
import { UserService } from 'app/service/user.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router, UrlSegment } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from '../service/storage.service';
import { GooglemapsComponent } from 'app/googlemaps/googlemaps.component';
import { Geolocation } from '@capacitor/geolocation';
 

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
  ubicacion : Ubicacion = null

  vendedorForm = this.FormBuilder.group({
    finca : ['',[Validators.required,Validators.minLength(3)]],
    direccionEs : ['',[Validators.required, Validators.minLength(15)]],
    vereda : ['',[Validators.required, Validators.minLength(4)]],
  })

  compradorForm = this.FormBuilder.group({
    direccionEs : ['',[Validators.required, Validators.minLength(15)]],
  })

  repartidorForm = this.FormBuilder.group({
    rutas : ['',[Validators.required, Validators.minLength(10)]],
  })

  constructor(
    private modalController: ModalController,
    public FormBuilder:FormBuilder,
    public userService:UserService,
    public storageService:StorageService,
    public loadingControler: LoadingController, 
    public router :Router,
    ) {
      

     }

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
      console.log("Event")
      this.verifyPhotos()
    }else{
      this.setOpenToast(true,"fomulario incorrecto")
    }
  }

  async insetTypeUserComprador(){
    if(this.compradorForm.valid){
        const loading = await this.loadingControler.create()
      await loading.present()
      const newUserType: Client = {
        direccion : this.compradorForm.value.direccionEs,
        ubicacion : this.ubicacion
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
      this.router.navigate(['/maindelivery/ordersAvaliable'])
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
  

  verifyPhotos(){ 
    if(this.ubicacion != null){
      this.dataUrls = [this.dataUrlToFile(this.imageSelect1,"1"), this.dataUrlToFile(this.imageSelect2,"2"), this.dataUrlToFile(this.imageSelect3,"3")];
      this.fileNames = ['imagen1.png', 'imagen2.png', 'imagen3.png'];
      
        this.uploadFiles()
    }else{
      this.setOpenToast(true,"ingrese su localizacion en el mapa")
    }
  }

  async uploadFiles() {
    console.log("subiendo")
    const dates : Seller = {
      nombreEmpresa : this.vendedorForm.value.finca, 
      direccion : this.vendedorForm.value.direccionEs,
      vereda : this.vendedorForm.value.vereda,
      ubicacion : this.ubicacion
      
    }
   await this.storageService.uploadMultipleFiles(this.dataUrls,this.fileNames,dates)
    
  }     
  
  setOpenToast(isOpen: boolean,message:string) {
    this.isToastOpen = isOpen;
    this.messageToast = message
  } 

  async addDirection() {
    
    console.log('mylocation() click')

    Geolocation.getCurrentPosition().then(async(res) => {

      console.log('mylocation() -> get ', res);
    
      let cordenadas = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
      }

      let positionInput = {  
        lat: 0,
        lng: 0,
      };

      if (cordenadas !== null) {
          positionInput = cordenadas; 
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
        this.ubicacion = data.pos
      }

    });

  }
}




