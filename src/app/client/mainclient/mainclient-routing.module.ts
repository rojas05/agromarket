import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainclientPage } from './mainclient.page';

const routes: Routes = [
  {
    path: '',
    component: MainclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainclientPageRoutingModule {}
