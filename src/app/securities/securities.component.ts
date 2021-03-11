import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SecuritiesServices } from '../services/securities.services';

@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html',
  styleUrls: ['./securities.component.css']
})
export class SecuritiesComponent implements OnInit {

  securityname: string;
  id: string;

  param1: string;
  param2: string;
  param3: string;
  param4: string;
  param5: string;
  param6: string;

  mandant: string;

  spotSelected: boolean;

  constructor(private router: Router, private securitiesServices: SecuritiesServices) {
    this.spotSelected = false;

    this.param1 = '';
    this.param2 = '';
    this.param3 = '';
    this.param4 = '';
    this.param5 = '';
    this.param6 = '';

    this.mandant = 'Mandant...';
  }

  ngOnInit(): void {
  }

  onLoadSPoT() {
    console.log("onLoadSPoT() called. Security name: " + this.securityname);

    this.securitiesServices.onLoadSPoT(this.securityname).subscribe((response: Response) => {
      console.log(response);
      this.id = response['id'];
      console.log("id: " + this.id);
      this.spotSelected = true;
      //this.editorComponent.editorInstance.setData(response['htmlText']);
      //this.template.id = response['id'];
      //this.id = response['id'];
      //this.template.title = response['title'];
      //this.template.htmlText = response['htmlText'];
    });
  }

  nonSelected() {
    return !this.spotSelected;
  }



  onSubmit() {
    console.log("onSubmit called");
    //this.securitiesServices.downloadFile(this.id).subscribe(res => {
    //  const fileURL = URL.createObjectURL(res);
    //  window.open(fileURL, '_blank');
    //});

    console.log("Param1: " + this.param1);
    console.log("Param2: " + this.param2);
    console.log("Param3: " + this.param3);
    console.log("Param3: " + this.mandant);

    this.securitiesServices.createSecurity(this.id, this.param1, this.param2, this.param3, this.param4, this.param5, this.param6, this.mandant).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

}
