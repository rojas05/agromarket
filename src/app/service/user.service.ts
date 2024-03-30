import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AutenticationService } from './autentication.service';
import { User, Seller, Client, Delivery } from 'app/models/interfaceUser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public Firestore: AngularFirestore, public service: AutenticationService) { }

  async registerUser (usuario: User){
    const idUser = (await this.service.getProfile()).uid
    return await this.Firestore.collection('/user').doc(idUser).set(usuario)
  }

  async registerUserVendedor (seller: Seller){
    const idUser = (await this.service.getProfile()).uid
    return await this.Firestore.collection('/user/'+idUser+'/Type').doc("seller").set(seller)
  }

  async registerUserComprador (client: Client){
    const idUser = (await this.service.getProfile()).uid
    return await this.Firestore.collection('/user/'+idUser+'/Type').doc("client").set(client)
  }

  async registerUserRepartidor (delivery: Delivery){
    const idUser = (await this.service.getProfile()).uid
    return await this.Firestore.collection('/user/'+idUser+'/Type').doc("delivery").set(delivery)
  }
  
}
