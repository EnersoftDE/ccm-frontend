import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { IXSLTStylesheet } from '../models/IXSLTStylesheet';
import { map, catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { XsltEditorComponent } from '../xslt/xslt-editor/xslt-editor.component';
import { XSLTSTYLESHEETS } from '../shared/mock-xsltstylesheets';
import { IXMLBusinessData } from '../models/IXMLBusinessData';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  localServer = 'http://localhost:5000';
  awsServer = 'http://Enersoftccmbase-env.eba-2zv5czsw.us-east-1.elasticbeanstalk.com';
  server: string;

  constructor(private httpClient: HttpClient) {
    this.server = this.awsServer;
  }


  public upload(formData) {
    console.log("uploadservice called");

    return this.httpClient.post(this.server + '/saveXMLBusinessDataMP', formData);
  }

  public uploadResource(formData) {
    console.log("uploadResource called");

    return this.httpClient.post(this.server + '/saveTemplateResource', formData);
  }

  public uploadTestcasesFile(formData) {
    console.log("uploadTestcasesFile called");

    return this.httpClient.post(this.server + '/renderTestcases', formData);
  }

  public uploadOriginal(formData) {

    return this.httpClient.post<any>(this.server + '/saveXMLBusinessDataMP', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveXSLTStylesheet(template: IXSLTStylesheet): Observable<IXSLTStylesheet> {
    let responseData: any;
    let returnFromServer: IXSLTStylesheet;
    console.log("saveTemplate" + template);
    let serializedForm = JSON.stringify(template);


    responseData = serializedForm;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.post<IXSLTStylesheet>(this.server + '/saveXSLTStylesheet', responseData, httpOptions);
  }

  saveXSLTStylesheetOLDANDWORKING(template: IXSLTStylesheet): IXSLTStylesheet {
    let responseData: any;
    let returnFromServer: IXSLTStylesheet;
    console.log("saveTemplate" + template);
    let serializedForm = JSON.stringify(template);


    //responseData = '{ "title": "Template 1", "htmlText": " html"} ';
    responseData = serializedForm;


    //const headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    //const options = new RequestOptions({ headers: headers });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    this.httpClient.post(this.server + '/saveXSLTStylesheet', responseData, httpOptions).subscribe((response2: Response) => {
      console.log(response2);
      //const rdata = response2.text();
      //console.log('text: ' + rdata);

      //this.template.title = response['title'];
      console.log(response2['name']);


      return response2;

    });
    return null;
  }

  loadXSLTStylesheet(name: string) {
    let responseData: any;
    console.log("load XSLT-Stylesheet " + name);
    let serializedForm = JSON.stringify(name);

    responseData = serializedForm;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.get(this.server + '/getXSLTStylesheet/name/' + name, httpOptions);
  }

  deleteXSLTStylesheet(id: String) {
    let responseData: any;
    console.log("deleting XSLT-Stylesheet " + id);
    let serializedForm = JSON.stringify(id);

    responseData = serializedForm;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.delete(this.server + '/deleteXSLTStylesheet/' + id, httpOptions);
  }

  deleteXMLBusinessData(id: String) {
    let responseData: any;
    console.log("deleting XML " + id);
    let serializedForm = JSON.stringify(id);

    responseData = serializedForm;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.delete(this.server + '/deleteXMLBusinessData/' + id, httpOptions);
  }

  loadTemplate() {
    console.log("Upload Service loadTemplate() called");
  }

  getXSLTStylesheetsMOCK() {
    return of(XSLTSTYLESHEETS);
  }

  getXSLTStylesheets(): Observable<IXSLTStylesheet[]> {
    let responseData: any;
    console.log("UploadService::getXSLTStylesheets()");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.get<IXSLTStylesheet[]>(this.server + '/getAllTXSLTStylesheets', httpOptions).pipe(tap(_ => this.log('fetched xslt-stylesheets')),
      catchError(this.handleError<IXSLTStylesheet[]>('getXSLTStylesheets', [])));
  }

  getAllXMLBusinessData(): Observable<IXMLBusinessData[]> {
    let responseData: any;
    console.log("UploadService::getAllXMLBusinessData()");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };

    return this.httpClient.get<IXMLBusinessData[]>(this.server + '/getAllXMLBusinessData', httpOptions).pipe(tap(_ => this.log('fetched xml business data')),
      catchError(this.handleError<IXMLBusinessData[]>('getAllXMLBusinessData', [])));
  }

  renderDocument(name: string, xmlBusinessData: string): any {
    return this.httpClient.get(this.server + '/renderXSLTStylesheet/' + name + '?' + 'xmlBusinessData=' + xmlBusinessData, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }



  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }
}
