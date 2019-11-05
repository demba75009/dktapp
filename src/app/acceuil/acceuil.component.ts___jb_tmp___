import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
    isAuth: boolean;
// on utilise le service
  constructor(private authService: AuthService) {



  }

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

}
