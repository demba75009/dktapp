import { Injectable } from '@angular/core';
//on lie la base de donnée au service
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    //cette fonction va crée un nouvelle utilisateur

    createNewUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    //cette fonction va permettre la connexion d'un utilisateur
    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
//on utilise cette fonction pour deconnecter l'utilisateur
    signOutUser() {
        firebase.auth().signOut();
    }
}