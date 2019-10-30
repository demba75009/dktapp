import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuth: boolean;
// on utilise le service
    constructor(private authService: AuthService) { }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        );
    }

    // on va deconnecter l'utilisateur
    onSignOut() {
        if(confirm('Etes-vous sûr de vouloir vous deconnecter ?')) {
            this.authService.signOutUser();

        } else {
            return null;
        }
       console.log('vous etes déconnecter !');
    }

}