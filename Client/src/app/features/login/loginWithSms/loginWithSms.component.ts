import { AngularFire } from 'angularfire2';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { HttpService } from 'common/services/http.service';
import { AuthService } from 'common/services/auth/auth.service';
import { User } from 'common/Models/user';


@Component({
    moduleId: module.id,
    selector: 'as-login-sms',
    templateUrl: 'loginWithSms.html'
})
export class LoginWithSmsComponent {
    ticks;
    subscription;
    ifGet;
    ifTrue;
    number10: boolean = true;
    regTel = /^(0)?(5[01234589])?\d{7}$/;

    smsState: boolean = false;
    numberState: boolean = true;

    constructor(public httpService: HttpService, public authService: AuthService,
        public router: Router) { }

    if10(phoneNumber) {
        if (!this.regTel.test(phoneNumber)) {
            this.number10 = false;
        }
        else {
            this.number10 = true;
        }

    }

    sendCodeBySms(phoneNumber) {
        event.preventDefault();
        this.if10(phoneNumber);
        if (this.number10 === false) {
            return;
        }
        this.ticks = 10;
        this.ifGet = true;
        this.ifTrue = false;
        let timer = Observable.timer(1000, 1000);

        this.subscription = timer.subscribe(t => {
            if (this.ticks > 0) { this.ticks--; }
            else { this.ifGet = false; }
        });

        this.httpService.sendCode(phoneNumber, 'Mobile').subscribe(
            res => {
                 let resObj = res.json();
                // this.smsState = (<Response>res).ok;
                this.smsState = resObj.success;
                this.numberState = resObj.success;
                if (resObj.success) {
                  //  localStorage.setItem('id_token', JSON.stringify({ token: res.json().token }));
                    this.httpService.pid = resObj.Person_id;
                }
            },
            err => {
                console.log(err);
            });
    }

    loginWithSmsCode(code) {
        event.preventDefault();
       
       

        this.authService.loginWithSmsOrEmailCode( code,'Mobile', this.httpService.pid).subscribe(
                () => {
                // this.setMessage();
                if (this.authService.currentUser.isLoggedIn) {
                  
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                    // Redirect the user
                      this.httpService.isGood = 3;
                      this.httpService.isEmployee = false;
                    this.router.navigate([redirect]);
                } else {
                    this.ifTrue = true;
                    // this.message += ', please write correct email and password';
                }

            },
            (err) => {
               this.ifTrue = true;
            });
    }
}
