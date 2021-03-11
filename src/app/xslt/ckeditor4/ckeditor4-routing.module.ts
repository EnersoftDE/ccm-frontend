import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ckeditor4Component } from './ckeditor4.component';

const routes: Routes = [{ path: '', component: Ckeditor4Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ckeditor4RoutingModule { }
