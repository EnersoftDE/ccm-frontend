import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from 'src/app/editor/editor.component';
import { ViewComponent } from 'src/app/view/view.component';
import { SecuritiesComponent } from './securities/securities.component';
import { XsltEditorComponent } from './xslt/xslt-editor/xslt-editor.component';


const routes: Routes = [
  { path: '', component: EditorComponent },
  { path: 'templates', component: EditorComponent },
  { path: 'xslt', component: XsltEditorComponent },
  { path: 'view', component: ViewComponent },
  { path: 'documents', component: SecuritiesComponent },
  { path: 'ckeditor4', loadChildren: () => import('./xslt/ckeditor4/ckeditor4.module').then(m => m.Ckeditor4Module) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
