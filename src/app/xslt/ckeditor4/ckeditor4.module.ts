import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ckeditor4RoutingModule } from './ckeditor4-routing.module';
import { Ckeditor4Component } from './ckeditor4.component';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [Ckeditor4Component],
  imports: [
    CommonModule,
    Ckeditor4RoutingModule,
    CKEditorModule,
    FormsModule
  ]
})
export class Ckeditor4Module { }
