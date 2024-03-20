import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateproducPage } from './updateproduc.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateproducPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateproducPageRoutingModule {}
