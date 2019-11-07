//ce service va permette la recuperation, l'ajout ,la modification et la supression des livres
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Subject,Observable,of } from 'rxjs';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders, } from '@angular/common/http'

@Injectable()
export class BooksService {


    constructor(private http: HttpClient) {
        this.getBooks();
    }

    books: Book[] = [];

    searchBooks(term: string): Observable<Book[]> {
        if (!term.trim()) {
          // if not search term, return empty hero array.
          return of([]);
        }
       return this.getBooks();
        
    }
    //on crée un subject qui va permettre l ajout d'un nouveau livre
    booksSubject = new Subject<Book[]>();

    emitBooks() {
        this.booksSubject.next(this.books);
    }

    // sauvegarder  la liste de livre  dans la bdd
    saveBooks() {
      //la methode set va enregistre le livre sur la base de donnée
        firebase.database().ref('/books').set(this.books);
    }

    //on recuperer les livre de la bdd
    getBooks()  {
        firebase.database().ref('/books')
            .on('value', (data: DataSnapshot) => {
                    this.books = data.val() ? data.val() : [];
                    this.emitBooks();
                }
            );
    }
    //on recuperer un livre de la bdd via son id

    getSingleBook(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/books/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    //on crée un nouveaulivre
    createNewBook(newBook: Book) {
        this.books.push(newBook);
        this.saveBooks();
        this.emitBooks();
    }

    //on supprime le livre

    removeBook(book: Book) {
        if(book.photo) {
            const storageRef = firebase.storage().refFromURL(book.photo);
            storageRef.delete().then(
                () => {
                    console.log('Photo removed!');
                },
                (error) => {
                    console.log('Could not remove photo! : ' + error);
                }
            );
        }
        const bookIndexToRemove = this.books.findIndex(
            (bookEl) => {
                if(bookEl === book) {
                    return true;
                }
            }
        );
        this.books.splice(bookIndexToRemove, 1);
        this.saveBooks();
        this.emitBooks();
    }

//on va uploader une photo(ajouter) avec la methode uploadFile avec un argument de type fichier
    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                //permet d'eviter d'écraser un fichier du meme nom lors de l'ajout de l'image
                const almostUniqueFileName = Date.now().toString();

                const upload = firebase.storage().ref()
                //on garde le format d'origine de l'image avec la foncttion child
                    .child('images/' + almostUniqueFileName + file.name).put(file);

                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
               //on envoie les données vers le serveur
                    () => {
                        console.log('Chargement…');
                    },

                    //si il ya une erreur
                    (error) => {
                        console.log('Erreur de chargement ! : ' + error);
                        reject();
                    },

                    //si l'image à bien ete uploader on retourne l'url
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }

}