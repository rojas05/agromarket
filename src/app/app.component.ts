import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

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

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: li)');
    if ( prefersDark.matches ) {
        document.body.classList.toggle( 'dark' );
    }
}
    
}
