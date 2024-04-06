import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateqrcodePage } from './generateqrcode.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateqrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateqrcodePageRoutingModule {}
