import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AutenticationService } from './autentication.service';
import { finalize, last } from 'rxjs';
import { UserService } from './user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Seller, User } from 'app/models/interfaceUser';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    public ngFireStorage: AngularFireStorage,
    private fireAuth : AutenticationService, 
    private userService:UserService, 
    public loadingControler: LoadingController, 
    public router :Router,) { }

  private messages: string[] = [];

  async uploadMultipleFiles(dataUrls: File[], fileNames: string[],dates:Seller) {
    var uId
    this.fireAuth.getProfile().then((id)=>{
      uId =  id.uid
    }).finally(async()=>{
      const paths = dataUrls.map((file, index) => `imagenesTypeUser/${uId}/${fileNames[index]}`);
      const promises = dataUrls.map((file, index) => {
        this.uploadFile(file, paths[index],fileNames[index],dates)
      })
      await Promise.all(promises);
    })
    
  }


  async uploadFile(file: File, path: string, Filename, dates : Seller) {
    //constante para almacenar las url
    
    //mensaje de carga al usuario
    const loading = await this.loadingControler.create()
    await loading.present()
    //envio de imagenes
    const task = this.ngFireStorage.upload(path, file);
    //precentacion del mensaje
   
    //respuesta de la carga de datos
    task.then(async(it) => {
      //opteniendo la url
     const url = await it.ref.getDownloadURL()
      await this.messages.push(url)
  }).finally(async () => {
    if(Filename == 'imagen3.png'){
      this.router.navigate(['/home/orders'])
      console.log(this.messages)
      const newUserType: Seller = {
        nombreEmpresa : dates.nombreEmpresa,
        direccion : dates.direccion,
        img : this.messages,
        vereda : dates.vereda,
        ubicacion : dates.ubicacion 
      }
      await this.userService.registerUserVendedor(newUserType).catch((Error)=>{
          console.error
      })
    }
    loading.dismiss()
  });

  
 
  }
}
 //Explicación del problema:**

//La función uploadFile deve enviar tres imagenes a firestore y guardar sus urls en firebase ademas de mostar en consola una lista con las tres url pero solo muestra una

/*finally(async ()=>{
      //terminando el mesaje de carga
        
      
    })*/
