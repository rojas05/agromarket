import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   startScan = async () => {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector('body')?.classList.add('barcode-scanner-active');
  
    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        console.log(result.barcode);
      },
    );
  
    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };
  
   stopScan = async () => {
    // Make all elements in the WebView visible again
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
  
    // Remove all listeners
    await BarcodeScanner.removeAllListeners();
  
    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };
  
   scanSingleBarcode = async () => {
    return new Promise(async resolve => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
  
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          await listener.remove();
          document
            .querySelector('body')
            ?.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        },
      );
  
      await BarcodeScanner.startScan();
    });
  };
  
   scan = async () => {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  };
  
   isSupported = async () => {
    const { supported } = await BarcodeScanner.isSupported();
    return supported;
  };
  
   enableTorch = async () => {
    await BarcodeScanner.enableTorch();
  };
  
   disableTorch = async () => {
    await BarcodeScanner.disableTorch();
  };
  
   toggleTorch = async () => {
    await BarcodeScanner.toggleTorch();
  };
  
   isTorchEnabled = async () => {
    const { enabled } = await BarcodeScanner.isTorchEnabled();
    return enabled;
  };
  
   isTorchAvailable = async () => {
    const { available } = await BarcodeScanner.isTorchAvailable();
    return available;
  };
  
   setZoomRatio = async () => {
    await BarcodeScanner.setZoomRatio({ zoomRatio: 0.5 });
  };
  
   getZoomRatio = async () => {
    const { zoomRatio } = await BarcodeScanner.getZoomRatio();
    return zoomRatio;
  };
  
   getMinZoomRatio = async () => {
    const { zoomRatio } = await BarcodeScanner.getMinZoomRatio();
    return zoomRatio;
  };
  
   getMaxZoomRatio = async () => {
    const { zoomRatio } = await BarcodeScanner.getMaxZoomRatio();
    return zoomRatio;
  };
  
   openSettings = async () => {
    await BarcodeScanner.openSettings();
  };
  
   isGoogleBarcodeScannerModuleAvailable = async () => {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  };
  
   installGoogleBarcodeScannerModule = async () => {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };
  
   checkPermissions = async () => {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera;
  };
  
   requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  };
}
