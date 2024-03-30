import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Client, Seller, Delivery } from '../models/interfaceUser';
import { UserService } from 'app/service/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typeuser',
  templateUrl: './typeuser.page.html',
  styleUrls: ['./typeuser.page.scss'],
})
export class TypeuserPage implements OnInit {

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
    public loadingControler: LoadingController, 
    public router :Router
    ) { }

  ngOnInit() {
  }


  async insetTypeUserVendedor(){
    if(this.vendedorForm.valid){
      const loading = await this.loadingControler.create()
      await loading.present()
      const newUserType: Seller = {
        nombreEmpresa : this.vendedorForm.value.finca,
        direccion : this.vendedorForm.value.direccionEs
      }
    await this.userService.registerUserVendedor(newUserType).catch((Error)=>{
      console.log(Error);
      loading.dismiss()
      this.router.navigate(['/typeUser'])
    }).finally(()=>{
      this.router.navigate(['/home'])
      loading.dismiss()
    })  
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
}
