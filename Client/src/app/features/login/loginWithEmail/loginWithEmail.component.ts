import { Directive, Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { User,ROLE } from 'common/Models/user';
import { Router } from '@angular/router';
import { AuthService } from 'common/services/auth/auth.service';
import { ValidationService } from 'common/services/validation.service';
// import { HelpService } from '../../common/services/help.service';
import { PasswordDirective } from 'common/directives/password/password.directive';
import { HelpService } from 'common/services/help.service';
import { HttpService } from 'common/services/http.service';
import { LoginResolve } from 'shared/resolvers/login.resolver';

@Component({
    moduleId: module.id,
    selector: 'as-login-email',
    templateUrl: 'loginWithEmail.html'
})
export class LoginWithEmailComponent {
    data = {};
    message: string;
    emailField: string = '';
    user: User = new User();
    done: boolean = false;
   // password = 'secret';
    show = false;
    hideState = true;
    emailValid = 0;
    passValid = 0;

    @ViewChild(PasswordDirective) pwdelement;

    constructor(public authService: AuthService, public router: Router, public httpService: HttpService,
        public validationService: ValidationService, public helpServiceLogin: HelpService, public loginResolve: LoginResolve) {

    }


    forgot() {
               this.httpService.fpState = 0;
        this.router.navigate(['/forgetpsw']);
        this.httpService.isGood = 2;
    }

    login(user) {
     //   event.preventDefault();
        // this.validationService.validateEmail(user);
        this.emailValid = this.validationService.validateEmail(user.Email);
        this.passValid = this.validationService.validationPassword(user.passWord);
        if (this.emailValid !== 0 || this.passValid !== 0) {
            return;
        }
        this.authService.login(user).subscribe(
            () => {
                // this.setMessage();
                if (this.authService.currentUser.isLoggedIn) {
                    // Redirect the user
                    this.httpService.isGood = 3;
                  //  this.httpService.isEmployee = false;
                    this.router.navigate([this.loginResolve.resolveHomeRoute()]);
                }/* else {
                    this.passValid = 2;
                    // this.message += ', please write correct email and password';
                }*/
            },
            (err) => {
                console.log('Error: ', err);
                this.passValid = 2;
                // this.setMessage();
            });
    }
 
}
