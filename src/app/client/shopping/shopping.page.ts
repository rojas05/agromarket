import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  alertButtons = ['Action'];

  public context!: String
  alertController: any;

  constructor() { }

  ngOnInit() {
    this.initShoppingPending()
  }

  initShopping(){
    this.context = "Exitosas"
  }

  initShoppingPending(){
    this.context = "Pendientes"
  }


}
