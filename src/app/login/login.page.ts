import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutenticationService } from 'app/service/autentication.service';
import { Router } from '@angular/router';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  isToastOpen = false;



  loginForm = this.formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]]
  })

  constructor(
    public formBuilder:FormBuilder, 
    public loadingControler: LoadingController, 
    public authService:AutenticationService,
    public router:Router,
    ) { 


    }

  ngOnInit() {
   
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async login(){
      if(this.loginForm.valid){
        const loading = await this.loadingControler.create()
        await loading.present()
        await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).then((credential)=>{
          if(credential.user.uid.length != 0){
            this.userSubscription = this.user$.subscribe((aUser: User | null) => {
              if(aUser){
                console.log(aUser.uid);
                this.router.navigate(['/home/orders'])
              }
           
          })
          }else{
            this.setOpen(true)
          }
        }).catch((Error)=>{
            console.log(Error);
        }).finally(()=>{
          loading.dismiss() 
        })
      }else{
        this.setOpen(true)
      }
  }

  getErrorEmailMessage(){
    if(this.loginForm.controls.email.hasError('required')){
      return 'el correo es requerido* ejem miCorreo@agroMarket.com'
    }
    return ""
  }

  getPasswordNameMessage(){
    if(this.loginForm.controls.password.hasError('required')){
      return 'la contrasena es requerida* ejem MiContrasena987'
    }
    return ""
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
