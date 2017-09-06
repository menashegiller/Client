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
    noRows:number = 1;
  
    ngOnInit() {
        this.httpService.GetAllUsers(this.authService.currentUser.id,"tableDecisions").subscribe(
            res => {
                let that = this;
                // this.smsState = (<Response>res).ok;
            //  that.user = res.json().user;
            that.users = res.json().users;
            if(that.users.length == 0){
                that.noRows = 0;
            }
            },
            err => {
                console.log(err);
            });
        }

    constructor(public httpService: HttpService, public router: Router,
                 public authService: AuthService
    /*, private localeService: LocaleService*/) {
    }
    
    watch(Person_id,param){
        this.authService.ifPrint = param;
        this.authService.studentId = Person_id;
       // this.router.navigate(['/studentForm']);
        window.open( "studentForm" );
    }

    sendDecision(user){
        this.httpService.sendDecision(user).subscribe(
               res => {
                   user.wasSaved = res.json().success;
                   if(user.wasSaved){
                    user.wasSavedMess = true;
                    setTimeout(() => {
                        user.wasSavedMess
                         = false;
                      }, 6000);
                 }
                }
             );
            

             

           
    }

    buttonClick(event) {
        //   console.log(event.currentTarget.eventPhase);
        let temp = event.currentTarget.id;
        let offset = temp * 68;
        $(".accordionTblDecisons").animate({scrollTop: offset +"px" });
        document.body.scrollTop = 630; 
    }
} 
