import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

    bookForm: FormGroup;
    fileIsUploading = false;
    fileUrl: string;
    fileUploaded = false;

    constructor(private formBuilder: FormBuilder, private booksService: BooksService,
                private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    //on verifie les informations du formulaire sont bien respecter
    initForm() {
        this.bookForm = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            synopsis: ''
        });
    }

    //on sauvegarde les informations du formulaire
    onSaveBook() {
        const title = this.bookForm.get('title').value;
        const author = this.bookForm.get('author').value;
        const synopsis = this.bookForm.get('synopsis').value;
        const newBook = new Book(title, author);
        newBook.synopsis = synopsis;
        //on cree un input pour la photo
        if(this.fileUrl && this.fileUrl !== '') {
            newBook.photo = this.fileUrl;
        }
        this.booksService.createNewBook(newBook);
        this.router.navigate(['/books']);
    }
//on va crée une méthode qui va recuperer l'url du fichier
    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.booksService.uploadFile(file).then(
            (url: string) => {
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
            }
        );
    }
    //liason avec le input pour les fichiers
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }

}

