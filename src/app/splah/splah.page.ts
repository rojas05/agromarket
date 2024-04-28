import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-splah',
  templateUrl: './splah.page.html',
  styleUrls: ['./splah.page.scss'],
})
export class SplahPage implements OnInit {
  isOpen = false
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  typesUser: string[]

  constructor(
    public router:Router,
    public userService:UserService
  ) { }

  ngOnInit() {
      this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        if(aUser){
          this.userService.getTypeUser(aUser.uid).then((date)=>{
            date.snapshotChanges().subscribe((res)=>{
              this.typesUser = res.map((item) => {
                console.log(item.payload.doc.id);
                return item.payload.doc.id
              });
              this.initDialog()
            })
          })
         
        }else{
          this.router.navigate(['/login'])
        }
    })
}

initDialog() {
  if(this.typesUser[1]){
    this.isOpen = true
  }else{
    if(this.typesUser[0]){
      if(this.typesUser[0] == "client"){
        this.router.navigate(['/mainclient'])
      }else if(this.typesUser[0] == "seller"){
        this.router.navigate(['/home/orders'])
      }else if(this.typesUser[0] == "delivery"){
        this.router.navigate(['/maindelivery/ordersAvaliable'])
      }
    }else{
      this.router.navigate(['/typeuser'])
    }
  }
}

onClick(parametro: string){
  this.isOpen = false
  if(parametro == "client"){
    this.router.navigate(['/mainclient'])
  }else if(parametro == "seller"){
    this.router.navigate(['/home/orders'])
  }else if(parametro == "delivery"){
    this.router.navigate(['/maindelivery/ordersAvaliable'])
  }
}

}


