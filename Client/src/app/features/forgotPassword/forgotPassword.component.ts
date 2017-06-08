import { Component } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpService } from 'common/services/http.service';
import { Http, Response } from '@angular/http';
import { AngularFire } from 'angularfire2';
import { AuthService } from 'common/services/auth/auth.service';
import { Directive, OnInit, ViewChild } from '@angular/core';
import { HelpService } from 'common/services/help.service';
import { User } from 'common/Models/user';
import { PasswordDirective } from 'common/directives/password/password.directive';
import { Headers, URLSearchParams } from '@angular/http';
@Component({
    moduleId: module.id,
    selector: 'as-forgot-psw',
    templateUrl: 'forgotPassword.html'
})
export class ForgotPasswordComponent {
    show = false;
    hideState = true;
    hideState2 = true;
    hideState3 = true;
    user: User = new User();
    isNotUser: boolean = false;
  
    ifGood: boolean = false;
    @ViewChild(PasswordDirective) pwdelement;
    goodPass = 0;

    constructor(public httpService: HttpService, public authService: AuthService, public router: Router, public helpService: HelpService,
    private activatedRoute: ActivatedRoute) {
   
    }

   
    forgot(email) {
        event.preventDefault();
        this.httpService.sendCode(email, 'Email').subscribe(
            res => {
                // this.smsState = (<Response>res).ok;
                let resObj = res.json();

                // this.numberState = res.json().success;
                if (resObj.success) {
                   this.httpService.pid = resObj.Person_id,
                   this.httpService.fpState = 1;
                }
                else {
                    this.isNotUser = true;
                }
            },
            err => {
                console.log(err);
            });
    }

    resetPass(passWord) {
        event.preventDefault();
      /*  let currentUser = JSON.parse(localStorage.getItem('id_token'));
        let token = currentUser.token;*/
        this.authService.loginWithSmsOrEmailCode( passWord, 'Email',this.httpService.pid).subscribe(
            res => {
                if (this.authService.currentUser.isLoggedIn) {
                    // Get the redirect URL from our auth service
                    // If no redirect has been set, use the default
                  //  this.authService.isLoggedIn = true;
                    this.httpService.fpState = 2;
                } else {
                    this.ifGood = true;
                    // this.message += ', please write correct email and password';
                }

            },
            (err) => {
                this.ifGood = true;
            });
    }
    goToHome(){
      //  this.authService.email = res.json().email;
                this.httpService.isGood = 3;
                   this.router.navigate(['/home']);
    }

    SavePassword(passWord1, passWord2) {
        event.preventDefault();
      //  let currentUser = JSON.parse(localStorage.getItem('id_token'));
    //    let token = currentUser.token;
        if (passWord1 === passWord2){
                this.httpService.saveNewPassword(passWord1,this.authService.currentUser.id).subscribe(
            res => {
                // this.smsState = (<Response>res).ok;
                
                if (res.json().success) {
                   // localStorage.setItem('currentUser', JSON.stringify({ token: res.json().token }));
                   this.authService.email = res.json().email;
                  //  this.authService.isLoggedIn = true;
                  this.httpService.fpState = 3;
                 //  this.router.navigate(['/home']);
                }
            },
            err => {
                console.log(err);
            });
        }
        else{
            this.goodPass = 1;
            return;
        }

    }
}
