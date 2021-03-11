import { Component, OnInit, ViewChild } from '@angular/core';
import { IArticle } from '../models/IArticle';
import { FormsModule } from '@angular/forms';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { TemplateServices } from '../services/template.services';
import { ITemplate } from '../models/ITemplate';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';




@Component({
  // selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('editor') editorComponent: CKEditorComponent;

  public Editor = DocumentEditor;
  editorConfig = {
    placeholder: 'Inhalt hier einfügen',
    //height: '800px',

  };
  data = "";


  article: IArticle;
  template: ITemplate;
  id: string;

  constructor(private router: Router, private templateServices: TemplateServices) {
    this.article = {
      title: '',
      text: '',
    };

    this.template = {
      id: '',
      title: '',
      htmlText: '',
    };

    this.id = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onSubmit() called");

    let serializedTemplate = JSON.stringify(this.article.text);
    console.log("serializedTemplate: " + serializedTemplate);
    console.log("Article: " + this.article);

    this.template = {
      id: this.id,
      title: this.article.title,
      htmlText: this.article.text
    };
    console.log("Template: " + this.template);

    this.templateServices.saveTemplate(this.template);

    this.editorComponent.editorInstance.setData("done");
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )

  }

  onLoadTemplate() {
    console.log("onLoadTemplate() called");
    let newData = "<p>this is a template</p><p>sometime <strong>bold</strong>, sometime not!&nbsp;</p><p>Köhler</p><figure class=\"table\"><table><thead><tr><th>eins</th><th>zwei</th></tr></thead></table></figure>";
    this.templateServices.loadTemplate(this.article.title).subscribe((response: Response) => {
      console.log(response);
      this.editorComponent.editorInstance.setData(response['htmlText']);
      this.template.id = response['id'];
      this.id = response['id'];
      this.template.title = response['title'];
      this.template.htmlText = response['htmlText'];
    });

  }

  /*
  service:
  getConfig() {
  return this.http.get(this.configUrl);
  } 

  caller:
  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });*/

}
