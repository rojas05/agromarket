import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeuserPage } from './typeuser.page';

const routes: Routes = [
  {
    path: '',
    component: TypeuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeuserPageRoutingModule {}
