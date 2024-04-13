import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutenticationService } from 'app/service/autentication.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/interfaceUser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  messageToast:string

  isToastOpen = false;

  registerForm = this.formBuilder.group({
    fullname : ['',[Validators.required,Validators.minLength(15)]],
    city : ['',[Validators.required, Validators.minLength(4)]],
    direccion : ['',[Validators.required, Validators.minLength(8)]],
    tel : ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]]
  })

  constructor(public formBuilder:FormBuilder, 
    public loadingControler: LoadingController, 
    public authService:AutenticationService,
    public userService: UserService,
    public router :Router) { 
    
  }

  ngOnInit() {
    
  }


  get errorControl(){
    return this.registerForm?.controls;
  }

  async singUp(){
      if(this.registerForm.valid){
        const newUser: User = {
          nombre : this.registerForm.value.fullname,
          municipio : this.registerForm.value.city,
          direccion : this.registerForm.value.direccion,
          telefono : this.registerForm.value.tel
        }
        const loading = await this.loadingControler.create()
        await loading.present()
        await this.authService.registerUser(this.registerForm.value.email,this.registerForm.value.password).then(async ()=>{
          await this.userService.registerUser(newUser).catch((Error)=>{
            console.log(Error);
            loading.dismiss()
            this.router.navigate(['/signup'])
          }).finally(()=>{
            this.setOpenToast(true,"Bienvenido")
          })
        }).catch((Error)=>{
          console.log(Error);
          loading.dismiss()

          console.log(this.registerForm.value.email,this.registerForm.value.password)
        }).finally(()=>{
          loading.dismiss()
          this.router.navigate(['/typeuser'])
        }
        )
      }else{
        this.setOpenToast(true,"Formulario Incorrecto")
      }
  }

  getErrorNameMessage(){
    if(this.registerForm.controls.fullname.hasError('required')){
      return 'el nombre es requerido* ejem: pepito martinez rojas'
    }
    return ""
  }

  getErrorDireccionMessage(){
    if(this.registerForm.controls.direccion.hasError('required')){
      return 'la Direccion es requerida* ejem: villanueva'
    }
    return ""
  }

  getErrorTelMessage(){
    if(this.registerForm.controls.tel.hasError('required')){
      return 'el telefono es requerido* ejem 325444713'
    }
    return ""
  }

  getErrorEmailMessage(){
    if(this.registerForm.controls.email.hasError('required')){
      return 'el correo es requerido* ejem miCorreo@agroMarket.com'
    }
    return ""
  }

  getPasswordNameMessage(){
    if(this.registerForm.controls.password.hasError('required')){
      return 'la contrasena es requerida* ejem MiContrasena987'
    }
    return ""
  }

  setOpenToast(isOpen: boolean,message:string) {
    this.isToastOpen = isOpen;
    this.messageToast = message
  }

  
}
