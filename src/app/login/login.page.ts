import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutenticationService } from 'app/service/autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isToastOpen = false;

  loginForm = this.formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]]
  })

  constructor(public formBuilder:FormBuilder, 
    public loadingControler: LoadingController, 
    public authService:AutenticationService,
    public router:Router) { }

  ngOnInit() {
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async login(){
      if(this.loginForm.valid){
        const loading = await this.loadingControler.create()
        await loading.present()
        await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(()=>{
        }).catch((Error)=>{
          console.log(Error);
          loading.dismiss()
  
          console.log(this.loginForm.value.email,this.loginForm.value.password)
        }).finally(()=>{
          loading.dismiss()
          this.router.navigate(['/home'])
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
