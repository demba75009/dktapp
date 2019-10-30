import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

    books: Book[];
    booksSubscription: Subscription;

    constructor(private booksService: BooksService, private router: Router) {}

    ngOnInit() {
        this.booksSubscription = this.booksService.booksSubject.subscribe(
            (books: Book[]) => {
                this.books = books;
            }
        );
        this.booksService.emitBooks();
    }

    //on va souscrire au subject et déclenche la création du livre et on affiche les livres

    onNewBook() {
      console.log('votre poste à éte ajouter');
        this.router.navigate(['/books', 'new']);

    }

    // on supprime le livre

    onDeleteBook(book: Book) {

//on demande la confirmation

        if(confirm('Etes-vous sûr de vouloir supprimer le livre ?')) {
            this.booksService.removeBook(book);
        } else {
            return null;
        }
    }
    // on va voir un livre en particulier

    onViewBook(id: number) {
        this.router.navigate(['/books', 'view', id]);
    }

    //on se deconnecte
    ngOnDestroy() {
        this.booksSubscription.unsubscribe();
    }
}