import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    errorMessage: string;
//on utilise le router , le servicer , et le formulaire reactive
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) { }
//on crée le formulaire
    ngOnInit() {
        this.initForm();
    }

    //on mets des coonditions dans les champs du formulaire avec la fonction validator
    initForm() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    //on valide le formulaire
    onSubmit() {
        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;
//on cree un new user
        this.authService.createNewUser(email, password).then(
            () => {
              //on dirige le user vers /books si les condition sont remplies
                this.router.navigate(['/books']);
            },

            //si les condition ne sont pas remplie on envoie un message d'erreur
            (error) => {
                this.errorMessage = error;
            }
        );
    }

    onBack() {
        this.router.navigate(['/acceuil']);
    }
}