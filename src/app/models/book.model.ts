import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Book {
    photo: string;
    synopsis: string;
    constructor(public title: string, public author: string) {
    }
}