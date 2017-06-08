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
    user: User = new User();
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


    // forgot() {
    //     this.router.navigate(['/forgetpsw']);
    // }

    // login(user) {
    //     event.preventDefault();
    //     // this.validationService.validateEmail(user);
    //     this.emailValid = this.validationService.validateEmail(user.email);
    //     this.passValid = this.validationService.validationPassword(user.passWord);
    //     if (this.emailValid !== 0 || this.passValid !== 0) {
    //         return;
    //     }
    //     this.authService.login(user).subscribe(
    //         () => {
    //             // this.setMessage();
    //             if (this.authService.isLoggedIn) {
    //                 // Get the redirect URL from our auth service
    //                 // If no redirect has been set, use the default
    //                 let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
    //                 // Redirect the user
    //                 this.router.navigate([redirect]);
    //             } else {
    //                 // this.message += ', please write correct email and password';
    //             }
    //         },
    //         (err) => {
    //             // this.setMessage();
    //         });
    // }

//    toggleShow(/*show, hideState, pwdelement */) {
//            this.show = !this.show;
//             //  console.log(this.pwdelement); // undefined
//             if (this.show) {
//                this.hideState = false;
//                 this.pwdelement.changeType('text');
//             } else {
//               this.hideState = true;
//                this.pwdelement.changeType('password');
//             }
//         }
}
