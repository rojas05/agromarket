import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platafor: Platform) {}

  initializeApp() {
    this.platafor.ready().then(()=>{
      
    })
  }


    
}
