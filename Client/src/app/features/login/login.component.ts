import { Directive, Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { User } from 'common/Models/user';
import { Router } from '@angular/router';
import { AuthService } from 'common/services/auth/auth.service';
import { ValidationService } from 'common/services/validation.service';
// import { HelpService } from '../common/services/help.service';

@Component({
    moduleId: module.id,
    selector: 'as-login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    data = {};
    message: string;
    emailField: string = '';
    done: boolean = false;
    password = 'secret';
    show = false;
    hideState = true;
    emailValid = 0;
    passValid = 0;

   //  @ViewChild(ValidateDirective) pwdelement;

    constructor(public authService: AuthService, public router: Router,
        public validationService: ValidationService) {

    }
}
