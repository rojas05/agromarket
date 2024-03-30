import { Injectable } from '@angular/core';

import firebase  from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { register } from 'swiper/element/bundle';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser (email:string,pasword:string){
    return this.ngFireAuth.createUserWithEmailAndPassword(email,pasword)
  }

  async loginUser (email:string,pasword:string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email,pasword)
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile () {
    return await this.ngFireAuth.currentUser  
  }
}
