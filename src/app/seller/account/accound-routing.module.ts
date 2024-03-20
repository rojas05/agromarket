import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccoundPage } from './accound.page';

const routes: Routes = [
  {
    path: '',
    component: AccoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccoundPageRoutingModule {}
