import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { IXSLTStylesheet } from 'src/app/models/IXSLTStylesheet';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { IXMLBusinessData } from 'src/app/models/IXMLBusinessData';
import { PagerService } from 'src/app/search-and-pagination/services/pager.service';

@Component({
  selector: 'app-ckeditor4',
  templateUrl: './ckeditor4.component.html',
  styleUrls: ['./ckeditor4.component.css']
})
export class Ckeditor4Component implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild('editor') editor;
  @ViewChild('demoForm') demoForm?: NgForm;

  // public editorData = '';

  xsltStylesheet: IXSLTStylesheet;
  allXSLTStylesheets: IXSLTStylesheet[];
  selectedXSLTStylesheet: IXSLTStylesheet;
  pagedXSLTStylesheets: IXSLTStylesheet[];
  xsltPager: any = {};
  xsltSelected: boolean;

  xmlBusinessData: IXMLBusinessData;
  allXMLBusinessData: IXMLBusinessData[];
  selectedXMLBusinessData: IXMLBusinessData;
  pagedXMLBusinessData: IXMLBusinessData[];
  xmlBusinessDataPager: any = {};
  xmlSelected: boolean;

  xsltLoaded: boolean;

  wysiwygViewActivated: boolean;

  file: any;
  loadedText: any;


  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  @ViewChild("xsltFileUpload", { static: false }) xsltFileUpload: ElementRef; xsltFiles = [];
  @ViewChild("xmlFileUpload", { static: false }) xmlFileUpload: ElementRef; xmlFiles = [];
  @ViewChild("resourceFileUpload", { static: false }) resourceFileUpload: ElementRef; resourceFiles = [];
  @ViewChild("testcasesFileUpload", { static: false }) testcasesFileUpload: ElementRef; testcaseFiles = [];

  constructor(private uploadService: UploadService, private XSLTPagerService: PagerService, private XMLBusinessDataPagerService: PagerService) {
    this.xsltStylesheet = {
      id: '',
      name: '',
      xsltStylesheet: ''
    };

    this.xmlBusinessData = {
      id: '',
      name: '',
      xmlBusinessData: ''
    };

    this.xsltSelected = false;
    this.xmlSelected = false;
    this.xsltLoaded = false;
    this.wysiwygViewActivated = false;
   
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit() called');
    //throw new Error('Method not implemented.');
    //this.editor.instance.execCommand( 'source');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit() called');
    //throw new Error('Method not implemented.');
    //this.editor.instance.execCommand( 'source');
    
    //this.editor.on('source', function(){
    //  console.log('source clicked');
    //});

    this.editor.dataChange.subscribe( ( value ) => {
			//if ( !this.isSourceActive ) {
        //this.sourceData = value;
        console.log('dataChange');
        if(this.editor.instance.mode != 'source')
        {
          // change was applied using the wysiwyg area, either by editing or changing the view
          console.log('changed from source');
          // disable the save button until the content was relaoded
          //this.wysiwygViewActivated = true;
          this.xsltLoaded = false;
        }
			}
		);
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');
    //this.editor.instance.execCommand( 'source');
  }

  doXSLTSearch(term: string) {
    console.log('doXSLTSearch() called');

    // SKO just to test the functionality
    //if(this.editor.instance.mode != 'source')
    //{
      //this.editor.instance.execCommand( 'source');
    //}
    

    this.uploadService.getXSLTStylesheets().subscribe(stylesheets => {
      this.allXSLTStylesheets = stylesheets;
      this.allXSLTStylesheets.sort((a, b) => (
        a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

      // initialize to page 1
      this.setXSLTPage(1);
      this.pagedXSLTStylesheets = this.allXSLTStylesheets.slice(this.xsltPager.startIndex, this.xsltPager.endIndex + 1);

      this.xsltSelected = false;
    });
  }

  doXSLTDelete() {
    if (this.selectedXSLTStylesheet != null) {
      console.log("deleting XSLT Stylesheet " + this.selectedXSLTStylesheet.name);
      this.uploadService.deleteXSLTStylesheet(this.selectedXSLTStylesheet.id).subscribe(response => {
        console.log(response)
        // refresh list
        this.doXSLTSearch("null");
        this.xsltSelected = false;
      })
    }
  }

  nonXSLTSelected() {
    return !this.xsltSelected;
  }

  setXSLTPage(page: number) {
    // get pager object from service
    this.xsltPager = this.XSLTPagerService.getPager(this.allXSLTStylesheets.length, page);

    // get current page of items
    this.pagedXSLTStylesheets = this.allXSLTStylesheets.slice(this.xsltPager.startIndex, this.xsltPager.endIndex + 1);
  }

  doXMLSearch(term: string) {
    console.log('doXMLSearch() called');

    this.uploadService.getAllXMLBusinessData().subscribe(xmlBusinessData => {
      this.allXMLBusinessData = xmlBusinessData
      this.allXMLBusinessData.sort((a, b) => (
        a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

      this.setXMLBusinessDataPage(1);
      this.pagedXMLBusinessData = this.allXMLBusinessData.slice(this.xmlBusinessDataPager.startIndex, this.xmlBusinessDataPager.endIndex + 1);
    });
  }

  doXMLDelete() {
    if (this.selectedXMLBusinessData != null) {
      console.log("deleting XML " + this.selectedXMLBusinessData.name);
      this.uploadService.deleteXMLBusinessData(this.selectedXMLBusinessData.id).subscribe(response => {
        console.log(response)
        // refresh list
        this.doXMLSearch("null");
        this.xmlSelected = false;
      })
    }
  }

  nonXMLSelected() {
    return !this.xmlSelected;
  }

  setXMLBusinessDataPage(page: number) {
    // get pager object from service
    this.xmlBusinessDataPager = this.XMLBusinessDataPagerService.getPager(this.allXMLBusinessData.length, page);

    // get current page of items
    this.pagedXMLBusinessData = this.allXMLBusinessData.slice(this.xmlBusinessDataPager.startIndex, this.xmlBusinessDataPager.endIndex + 1);
  }

  onXSLTSelect(stylesheet: IXSLTStylesheet): void {
    if (this.selectedXSLTStylesheet != stylesheet) {
      this.selectedXSLTStylesheet = stylesheet;
      this.xsltStylesheet.name = this.selectedXSLTStylesheet.name;
      this.xsltSelected = true;
      console.log('selected XSLT-Stylesheet: ' + this.selectedXSLTStylesheet.name);
    }
    else {
      console.log('un-selecteing XSLT-Stylesheet: ' + this.selectedXSLTStylesheet.name);
      this.selectedXSLTStylesheet = null;
      this.xsltStylesheet.name = '';
      this.xsltSelected = false;
    }

  }

  onXMLSelect(xmlBusinessData: IXMLBusinessData): void {
    if (this.selectedXMLBusinessData != xmlBusinessData) {
      this.selectedXMLBusinessData = xmlBusinessData;
      this.xmlBusinessData.name = this.selectedXMLBusinessData.name;
      this.xmlSelected = true;
      console.log('selected XML Business Data: ' + this.selectedXMLBusinessData.name);
    }
    else {
      console.log('un-selecteing XML: ' + this.selectedXMLBusinessData.name);
      this.selectedXMLBusinessData = null;
      this.xmlBusinessData.name = '';
      this.xmlSelected = false;
    }
  }

  nonXSLTLoaded() {
    return !this.xsltLoaded;
  }

  wysiwygActivated()
  {
    return this.wysiwygViewActivated;
  }

  /**
   * save the editor content
   */
  onSubmit() {
    console.log("onSubmit");
    this.editor.instance.getData();
    console.log(this.editor.instance.getData());

    this.xsltStylesheet.xsltStylesheet = this.editor.instance.getData()

    this.uploadService.saveXSLTStylesheet(this.xsltStylesheet).subscribe(stylesheet => {
      this.xsltStylesheet = stylesheet;
      this.doXSLTSearch("null");
    }
    );
    console.log(this.xsltStylesheet);
  }

  onLoadTemplateFromServer() {
    console.log("onLoadTemplateFromServer() called");

    if(this.editor.instance.mode != 'source')
    {
      this.editor.instance.execCommand( 'source');
      this.editor.instance.getCommand( 'source' ).disable;
      this.editor.instance.getCommand( 'source' ).setState( 0 );
    }

    //this.editor.instance.execCommand( 'source');

    //this.editor.instance.getCommand( 'source' ).disable();

    let newData = "<p>this is a template</p><p>sometime <strong>bold</strong>, sometime not!&nbsp;</p><p>Köhler</p><figure class=\"table\"><table><thead><tr><th>eins</th><th>zwei</th></tr></thead></table></figure>";
    this.uploadService.loadXSLTStylesheet(this.xsltStylesheet.name).subscribe((response: Response) => {
      console.log(response);
      this.xsltStylesheet.id = response['id'];
      this.xsltStylesheet.name = response['name'];
      this.xsltStylesheet.xsltStylesheet = response['xsltStylesheet'];
      this.editor.instance.setData(response['xsltStylesheet']);
      this.xsltLoaded = true;

    });

  }

  onRenderTemplate() {
    console.log("onRenderTemplate() called");
    console.log("XSLT: " + this.xsltStylesheet.name);
    console.log("XML Business Daten: " + this.xmlBusinessData.name);

    this.uploadService.renderDocument(this.xsltStylesheet.name, this.xmlBusinessData.name).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

  /**
  *** START BLOCK ONLOADXSLTFILES
  **/
  onLoadXSLTFiles() {
    console.log("onLoadXSLTFiles() called");

    if(this.editor.instance.mode != 'source')
    {
      this.editor.instance.execCommand( 'source');
    }

    

    //this.editor.instance.execCommand( 'source');
    // clear file array
    this.xsltFiles.splice(0);
    const xsltFileUpload = this.xsltFileUpload.nativeElement; xsltFileUpload.onchange = () => {
      for (let index = 0; index < xsltFileUpload.files.length; index++) {
        const file = xsltFileUpload.files[index];
        this.xsltFiles.push({ data: file, inProgress: false, progress: 0 });
      }

      console.log("uploadXSLTFilesLocal() files read");
      this.uploadXSLTFiles();
    };
    xsltFileUpload.click();
  }

  private uploadXSLTFiles() {
    this.xsltFileUpload.nativeElement.value = '';
    this.xsltFiles.forEach(xsltFile => {
      this.uploadXSLTFile(xsltFile);
    });
  }

  uploadXSLTFile(xsltFile) {
    const formData = new FormData();
    //formData.append('file', resourceFile.data);
    //formData.append('dataType', 'jpg');

    //this.uploadService.uploadResource(formData).subscribe(data => console.log(data));

    formData.append('file', xsltFile.data);
    console.log("file: " + formData.get.toString);

    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this.loadedText = reader.result;
      this.xsltStylesheet = {
        id: '',
        name: '',
        xsltStylesheet: this.loadedText
      }

      this.editor.instance.setData(this.loadedText);
      this.xsltLoaded = true;
      //this.uploadService.saveXSLTStylesheet(this.xsltStylesheet);
    };
    reader.readAsText(xsltFile.data);
  }
  /** 
  *** END BLOCK ONLOADXSLTFILES
  **/

  /**
  *** START BLOCK ONLOADXML
  **/
  onLoadXML() {
    console.log("onLoadXML() called");
    // clear file array
    this.xmlFiles.splice(0);

    const xmlFileUpload = this.xmlFileUpload.nativeElement; xmlFileUpload.onchange = () => {
      for (let index = 0; index < xmlFileUpload.files.length; index++) {
        const file = xmlFileUpload.files[index];
        this.xmlFiles.push({ data: file, inProgress: false, progress: 0 });
      }
      // this part will be called after open was clicked (dialog closes)
      console.log("onLoadXML() files read");
      this.uploadFiles();
      // refresh list
      this.doXMLSearch("null");

    };
    xmlFileUpload.click();
  }

  private uploadFiles() {
    this.xmlFileUpload.nativeElement.value = '';
    this.xmlFiles.forEach(xmlFile => {
      this.uploadFile(xmlFile);
    });
  }

  uploadFile(xmlFile) {
    const formData = new FormData();
    formData.append('file', xmlFile.data);
    formData.append('dataType', 'xml');

    this.uploadService.upload(formData).subscribe(data => console.log(data));
  }

  uploadFileORIGINAL(xmlFile) {
    const formData = new FormData();
    formData.append('file', xmlFile.data);
    xmlFile.inProgress = true;
    console.log("file: " + formData.get.toString);
    this.uploadService.uploadOriginal(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            xmlFile.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        xmlFile.inProgress = false;
        return of(`${xmlFile.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
  /** 
  *** END BLOCK ONLOADXML
  **/

  /**
  *** START BLOCK ONLOADRESOURCE
  **/
  onLoadResourceFile() {
    console.log("onLoadResourceFile() called");
    // clear file array
    this.resourceFiles.splice(0);

    const resourceFileUpload = this.resourceFileUpload.nativeElement; resourceFileUpload.onchange = () => {
      for (let index = 0; index < resourceFileUpload.files.length; index++) {
        const file = resourceFileUpload.files[index];
        this.resourceFiles.push({ data: file, inProgress: false, progress: 0 });
      }
      // this part will be called after open was clicked (dialog closes)
      console.log("onLoadResourceFile() files read");
      this.uploadResourceFiles();

    };
    resourceFileUpload.click();
  }

  private uploadResourceFiles() {
    this.resourceFileUpload.nativeElement.value = '';
    this.resourceFiles.forEach(resourceFile => {
      this.uploadResourceFile(resourceFile);
    });
  }

  uploadResourceFile(resourceFile) {
    const formData = new FormData();
    formData.append('file', resourceFile.data);
    formData.append('dataType', 'jpg');

    this.uploadService.uploadResource(formData).subscribe(data => console.log(data));
  }
  /** 
  *** END BLOCK ONLOADRESOURCE
  **/

  /**
  *** START BLOCK ONRENDERTESTCASES
  **/
  onRenderTestcases() {
    console.log("onRenderTestcases() called");
    // clear file array
    this.testcaseFiles.splice(0);

    const testcasesFileUpload = this.testcasesFileUpload.nativeElement; testcasesFileUpload.onchange = () => {
      for (let index = 0; index < testcasesFileUpload.files.length; index++) {
        const file = testcasesFileUpload.files[index];
        this.testcaseFiles.push({ data: file, inProgress: false, progress: 0 });
      }
      // this part will be called after open was clicked (dialog closes)
      console.log("onRenderTestcases() files read");
      this.uploadTestcaseFiles();

    };
    testcasesFileUpload.click();
  }

  private uploadTestcaseFiles() {
    this.testcasesFileUpload.nativeElement.value = '';
    this.testcaseFiles.forEach(testcaseFile => {
      this.uploadTestcaseFile(testcaseFile);
    });
  }

  uploadTestcaseFile(testcaseFile) {
    const formData = new FormData();
    formData.append('file', testcaseFile.data);
    formData.append('dataType', 'xlsx');

    this.uploadService.uploadTestcasesFile(formData).subscribe(data => console.log(data));
  }
  /** 
  *** END BLOCK ONRENDERTESTCASES
  **/

  // Datei auswählen Button
  fileChanged(e) {
    console.log("fileChanged");
    this.file = e.target.files[0];

    let fileReader = new FileReader();
    // onload will be fired after the ok button in the file select dialog is clicked 
    fileReader.onload = (e) => {
      console.log(fileReader.result);

      this.loadedText = fileReader.result;

      this.xsltStylesheet = {
        id: '',
        name: '',
        xsltStylesheet: this.loadedText
      }

      this.editor.instance.setData(this.loadedText);
      //this.editorComponent.editorInstance.setData(this.loadedText);
      this.uploadService.saveXSLTStylesheet(this.xsltStylesheet);

      console.log("xsltStylesheet: " + this.loadedText);
    }
    fileReader.readAsText(this.file);
  }


}
