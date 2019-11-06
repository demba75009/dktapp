import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import { Book } from '../models/book.model';
 import { BooksService } from '../services/books.service';
 @Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  book$: Observable<Book[]>;
  private searchTerms = new Subject<string>();

  constructor(private booksService: BooksService,) { }

// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}
  ngOnInit() {

this.book$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.booksService.searchBooks(term)),
    );
  }
  }

}
