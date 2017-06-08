import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';

import { AuthService } from 'common/services/auth/auth.service';

import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { User } from 'common/Models/user';


@Component({
    moduleId: module.id,
    selector: 'as-tableDecisions',
    templateUrl: 'tableDecisions.html'
})
export class TableDecisionsComponent implements OnInit {
    users: User[];
    
    ngOnInit() {
        this.httpService.GetAllUsers(0).subscribe(
            res => {
                let that = this;
                // this.smsState = (<Response>res).ok;
            //  that.user = res.json().user;
            that.users = res.json().users;
            },
            err => {
                console.log(err);
            });
        }

    constructor(public httpService: HttpService, public router: Router,
                 public authService: AuthService
    /*, private localeService: LocaleService*/) {
    }
    
    watch(Person_id){
        this.authService.studentId = Person_id;
        this.router.navigate(['/studentForm']);
    }
} 
