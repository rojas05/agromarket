import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AutenticationService } from './autentication.service';
import { Product } from 'app/models/interfaceProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public Firestore: AngularFirestore, 
    public service: AutenticationService
  ) { }

  async registerUserVendedor (product: Product){
    const idUser = (await this.service.getProfile()).uid
    return await this.Firestore.collection('/user/'+idUser+'/Type/seller/productos').doc().set(product)
  }
}
