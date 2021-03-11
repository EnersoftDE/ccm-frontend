
import { map } from 'rxjs/operators';
/**
 * Created by stefan.koehler on 9/12/2017.
 */
import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { ITemplate } from '../models/ITemplate';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TemplateServices {

    localServer = 'http://localhost:5000';
    server: string;

    constructor(private http: HttpClient, private config: ConfigService) {

        this.server = this.config.getValues().restPathRoot;
        console.log("TemplateService is using " + this.server);

    }

    saveTemplate(template: ITemplate) {
        let responseData: any;
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

        this.http.post(this.server + '/saveTemplate', responseData, httpOptions).subscribe((response2: Response) => {
            console.log(response2);
            //const rdata = response2.text();
            //console.log('text: ' + rdata);
        });
    }

    loadTemplate(title: string) {
        let responseData: any;
        console.log("loadTemplate" + title);
        let serializedForm = JSON.stringify(title);

        responseData = serializedForm;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8'
            })
        };

        return this.http.get(this.server + '/getTemplate/title/' + title, httpOptions);
    }

    getData() {

        // new browser window     const newWindow = this.nativeWindow.open('http://localhost:15002/DocWriteHTML/signin', '_blank', 'location=yes,height=800,width=1024,scrollbars=yes,status=yes');
        // new tab only      const newWindow = this.nativeWindow.open('http://localhost:15002/DocWriteHTML/signin');

        /*
        let responseData: any;
        let responseDataTicket: any;
     
        this.http.get(this.comFoundationServer + '/ccmInteractiveCreateDocumentInstance?resourceId=20170601').subscribe((response: Response) => {
            console.log(response);
            responseData = response.text();
            console.log('text: ' + responseData);
     
            const headers = new Headers({ 'Content-Type': 'application/xml' });
            const options = new RequestOptions({ headers: headers });
     
     
            this.http.post(this.comFoundationServer + '/postmessage', responseData, options).subscribe((response2: Response) => {
                console.log(response2);
                const rdata = response2.text();
                console.log('text: ' + rdata);
            });
     
            this.http.get(this.comFoundationServer + '/ccmTicketCreate' + '?resourceId=20170601').subscribe((response3: Response) => {
                console.log(response3);
                responseDataTicket = response3.text();
                console.log('text: ' + responseDataTicket);
     
                const headers2 = new Headers({ 'Content-Type': 'application/xml' });
                const options2 = new RequestOptions({ headers: headers2 });
     
                this.http.post(this.comFoundationServer + '/postmessage', responseDataTicket, options2).subscribe((response4: Response) => {
                    console.log(response4);
                    const rdata2 = response4.text();
                    console.log('text: ' + rdata2);
                });
            });
        });
        */

        // const newWindow = this.nativeWindow.open('http://sgds01:15002/DocWriteHTML/ccm/open/TICKET-20170911-1725');
        // const newWindow = this.nativeWindow.open('http://localhost:15002/DocWriteHTML/ccm/open/TICKET-20170911-1724');
    }



}
