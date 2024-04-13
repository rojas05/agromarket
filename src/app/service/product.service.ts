import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AutenticationService } from './autentication.service';
import { Product } from 'app/models/interfaceProduct';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable, map, startWith } from 'rxjs';
import {  collection, query, where, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(
    public Firestore: AngularFirestore, 
    public service: AutenticationService,
    public ngFireStorage: AngularFireStorage,
    private fireAuth : AutenticationService, 
    public loadingControler: LoadingController, 
    public router :Router,
    public FireBase : AngularFireDatabase,
  ) { }

  
  private messages: string[] = [];

  
  async uploadMultipleFiles(dataUrls: File[], fileNames: string[], producto: Product) {
    this.messages = []
    var uId
    this.fireAuth.getProfile().then((id)=>{
      uId =  id.uid
    }).finally(async()=>{
      const paths = dataUrls.map((file, index) => `imagenesProducto/${uId}/${producto.nombre}/${fileNames[index]}`);
      const promises = dataUrls.map((file, index) => {
        this.uploadFile(file, paths[index],fileNames[index],producto)
      })
      await Promise.all(promises);
    })
    
  }


  async uploadFile(file: File, path: string, fileName: string, producto: Product) {
    //constante para almacenar las url
   
    
    //mensaje de carga al usuario
    const loading = await this.loadingControler.create()
    await loading.present()
    //envio de imagenes
    const task = this.ngFireStorage.upload(path, file);
    //precentacion del mensaje
   
    //respuesta de la carga de datos
    await task.then(async(it) => {
      //opteniendo la url
     const url = await it.ref.getDownloadURL()
      await this.messages.push(url)
      
  }).finally( () => {
    if(fileName == 'imagen2.png'){
       this.registerNewProducto(this.messages,producto).catch((Error)=>{
          console.log(Error);
          this.router.navigate(['/addproduct'])
      })
      
    }
    loading.dismiss()
    this.router.navigate(['/home/account'])
  });

  }

  async registerNewProducto (urls: string[],producto:Product){
    const idUser = (await this.service.getProfile()).uid
    //agregando un producto a la costante
    const newProduct: Product = {
      nombre : producto.nombre,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      precio: producto.precio,
      categoria: producto.categoria,
      mercado: producto.mercado,
      img: urls,
      vendedor: 'user/'+idUser
    }
    //verificando que en la variable urls hay dos urls
    console.log(urls);
    //insertando el producto en firebase 
    
    await this.Firestore.collection('/products').doc().set(newProduct)
   
    //resultado solo se inserta una url y el espacio string contiene dos variables

    //resultado esperado se inserten dos urls en firebase 
  }

  async getProducts<tipo>() {
    const idUser = (await this.service.getProfile()).uid
    this.Firestore.collection('/products')
    const collection = this.Firestore.collection<tipo>(
      '/products',
      ref => ref.where('vendedor', '==', 'user/'+idUser)
    )
    return collection
  }

  async getProductsFalce<tipo>(cantidad: number) {
    const idUser = (await this.service.getProfile()).uid
    const collection = this.Firestore.collection<tipo>(
      '/products',
      ref => ref.where('cantidad', '==', cantidad) .where('vendedor', '==', 'user/'+idUser)
    )
    return collection
  }

  async getProductsClient() {
    return this.Firestore.collection('/user').doc().collection('/type').doc('seller').collection('/product')
  }


  async getProductsLocatio<tipo>(city:string) {
    this.Firestore.collection('/products')
    const collection = this.Firestore.collection<tipo>(
      '/products',
      ref => ref.where('municipio','array-contains-any', city.toLowerCase())
    )
    return collection
  }
}
