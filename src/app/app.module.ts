
import { ConfigModule } from './config/config.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { IArticle } from './models/IArticle';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewComponent } from './view/view.component';
import { TemplateServices } from './services/template.services';
import { SecuritiesComponent } from './securities/securities.component'
import { SecuritiesServices } from './services/securities.services';
import { XsltEditorComponent } from './xslt/xslt-editor/xslt-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ViewComponent,
    SecuritiesComponent,
    XsltEditorComponent,
  ],
  imports: [
    ConfigModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [TemplateServices, SecuritiesServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
