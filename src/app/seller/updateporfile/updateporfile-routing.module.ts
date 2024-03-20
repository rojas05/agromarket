import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateporfilePage } from './updateporfile.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateporfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateporfilePageRoutingModule {}
