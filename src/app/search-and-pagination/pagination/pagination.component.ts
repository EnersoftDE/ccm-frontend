import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPagination } from '../models/IPagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pagesArray: Array<number> = [];
  public currentPage: number = 1;

  @Output() goToPage = new EventEmitter<number>();

  @Input() set setPagination(pagination: IPagination) {
    if (pagination) {
      const pagesAmount = Math.ceil(
        pagination.itemsCount / pagination.pageSize
      );
      this.pagesArray = new Array(pagesAmount).fill(1);
    }
  }
  public setPage(pageNumber: number): void {
    if (pageNumber === this.currentPage)
      return;
    this.currentPage = pageNumber;
    this.goToPage.emit(pageNumber);
  }

}
