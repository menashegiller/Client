import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { AuthService } from 'common/services/auth/auth.service';
import { ROLE } from 'common/models/user';




@Component({
    moduleId: module.id,
    selector: 'as-Menu',
    templateUrl: 'menu.html',
    styleUrls: ['menu.css']
})
export class MenuComponent {
 

    constructor(public authService: AuthService, public httpService: HttpService, public router: Router/*, private localeService: LocaleService*/) {
      /*   if(this.authService.currentUser.role == ROLE.FUND_CHAIRMAN&& authService.pageName==''){
            authService.pageName ='tableDecisions';
        }
        else if(this.authService.currentUser.role == ROLE.SUPER_USER && authService.pageName==''){
            authService.pageName ='employee';
        } */
        if(window.location.pathname == "/tableDecisions" ) {
            authService.pageName ='tableDecisions';
        }  else if(window.location.pathname == "/filterReport" ){
            authService.pageName ='filterReport';
        }  else if(window.location.pathname == "/employee" ){
            authService.pageName ='employee';
        }  else if(window.location.pathname == "/effectiveReport" ){
            authService.pageName ='effectiveReport';
        } 
    }

    route(url){
         this.router.navigate(['/'+url]);
         this.authService.pageName = url;
    }
} 
