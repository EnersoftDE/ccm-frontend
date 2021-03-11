
/**
 * Created by stefan.koehler on 9/12/2017.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SecuritiesServices {

    localServer = 'http://localhost:5000';
    server: string;

    constructor(private http: HttpClient, private config: ConfigService) {
        this.server = this.config.getValues().restPathRoot;
        console.log("SecuritiesServices is using " + this.server);
    }

    createSecurity(id: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, mandant: string): any {
        return this.http.get(this.server + '/getPDF/' + id + '?' + '$param1=' + param1 + '&$param2=' + param2 + '&$param3=' + param3 + '&$param4=' + param4 + '&$param5=' + param5 + '&$param6=' + param6 + '&LOGOMANDANT=' + mandant, { responseType: 'blob' })
            .pipe(
                map((result: any) => {
                    return result;
                })
            );
    }

    downloadFile(url: string): any {
        return this.http.get(this.server + '/getPDF/' + url, { responseType: 'blob' })
            .pipe(
                map((result: any) => {
                    return result;
                })
            );
    }

    onLoadSPoT(title: string) {
        let responseData: any;
        console.log("onLoadSPoT" + title);
        let serializedForm = JSON.stringify(title);

        responseData = serializedForm;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'responseType': 'blob' as 'json',
            })
        };

        return this.http.get(this.server + '/getTemplate/title/' + title, httpOptions);
    }

    // const newWindow = this.nativeWindow.open('http://sgds01:15002/DocWriteHTML/ccm/open/TICKET-20170911-1725');
    // const newWindow = this.nativeWindow.open('http://localhost:15002/DocWriteHTML/ccm/open/TICKET-20170911-1724');
}