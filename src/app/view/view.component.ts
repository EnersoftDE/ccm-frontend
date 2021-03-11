import { Component, OnInit } from '@angular/core';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-classic';
import { IArticle } from '../models/IArticle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Editor = DocumentEditor;
  article: IArticle;

  constructor(private router: Router) {
    this.article = {
      title: this.router.getCurrentNavigation().extras.state.title,
      text: this.router.getCurrentNavigation().extras.state.text
    };
    console.log(this.article);
  }

  ngOnInit(): void {
  }

}
