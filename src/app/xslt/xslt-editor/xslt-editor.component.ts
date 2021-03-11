import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from '../../services/upload.service';
import { IXSLTStylesheet } from 'src/app/models/IXSLTStylesheet';

@Component({
  selector: 'app-xslt-editor',
  templateUrl: './xslt-editor.component.html',
  styleUrls: ['./xslt-editor.component.css']
})
export class XsltEditorComponent implements OnInit {

  //@ViewChild('editor') editorComponent: CKEditorComponent;

  file: any;
  loadedText: any;
  xsltStylesheet: IXSLTStylesheet;

  // public Editor = ClassicEditor;
  // editorConfig = {
  //   placeholder: 'Inhalt hier einfügen',
  // };

  data = "";

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(private uploadService: UploadService) {
    this.xsltStylesheet = {
      id: '',
      name: '',
      xsltStylesheet: ''
    };

  }

  ngOnInit(): void {
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )

  }

  uploadFile(file) {
    const formData = new FormData();
    console.log("data: " + file.data);
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.uploadOriginal(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  fileChanged(e) {
    console.log("fileChanged");
    this.file = e.target.files[0];

    let fileReader = new FileReader();
    // onload will be fired after the ok button in the file select dialog is clicked 
    fileReader.onload = (e) => {
      console.log(fileReader.result);

      this.loadedText = fileReader.result;

      this.xsltStylesheet = {
        id: "2",
        name: "name-2",
        xsltStylesheet: this.loadedText
      }

      //this.editorComponent.editorInstance.setData(this.loadedText);


      //this.uploadService.saveXSLTStylesheet(this.xsltStylesheet);

      console.log("xsltStylesheet: " + this.loadedText);
    }
    fileReader.readAsText(this.file);
  }

}
