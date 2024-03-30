import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatetypeuserPage } from './updatetypeuser.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatetypeuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatetypeuserPageRoutingModule {}
