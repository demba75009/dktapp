import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {

        //on utilise les config de firebase pour se connecter via angular
        const config = {
            apiKey: 'AIzaSyCbtt2R6zLsleAV2e8384hjyJJ9gbGVs1g',
            authDomain: 'https://livre-69940.firebaseio.com/',
            databaseURL: 'https://livre-69940.firebaseio.com/',
            projectId: 'bookshelves-3d570',
            storageBucket: 'livre-69940.appspot.com',
            messagingSenderId: '6634573823'
        };
        firebase.initializeApp(config);
    }
}
