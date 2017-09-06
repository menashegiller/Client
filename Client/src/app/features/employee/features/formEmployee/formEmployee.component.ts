import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringBuilder } from 'string-builder';

@Component({
    moduleId: module.id,
    selector: 'as-formEmployee',
    templateUrl: 'formEmployee.html',
})
export class FormEmployeeComponent implements OnInit {
    @Input() model: Employeemodel;

    wasSave = 0;
    wasSent = 0;
    newPass = 0;
    wasSaveAndSend = 0;
    ngOnInit() {
        this.model = this.model != null ? this.model : new Employeemodel();
        this.httpService.GetColleges(/*token*/ 0, 0).subscribe(
            res => res,
            err => {
                console.log(err);
            });

        this.httpService.GetRoles(/*token*/ 0).subscribe(
            res => res,
            err => {
                console.log(err);
            });
    }

    constructor(public httpService: HttpService, public router: Router/*, private localeService: LocaleService*/) {

    }

    saveAndSend(employeeForm: Employeemodel){
        let that = this;
        this.httpService.saveAndSendEmailtoNewEmployee(employeeForm).subscribe(
            res => {
                if (res.json().success) {
                    
                    that.wasSaveAndSend = 1;
                  /*   setTimeout(() => {
                                this.wasSaveAndSend = 2;
                            }, 2500); */
                    this.wasSent = 0;
                    if (!employeeForm.Person_id) {
                        this.model = new Employeemodel();
                        this.httpService.employees.unshift(res.json().emp);
                    }

                }
            },
            err => {
                console.log(err);
            });
    }


    onSubmit(employeeForm: Employeemodel) {
        console.log(employeeForm);  // { first: '', last: '' }

        this.httpService.SaveEmployee(employeeForm).subscribe(
            res => {
                if (res.json().success) {
                    this.wasSave = 1;
                      setTimeout(() => {
                                 this.wasSave = 2;
                            }, 2500);
                    this.wasSent = 0;
                    let temp=employeeForm.Person_id;
                    if (!temp) {
                        this.model = new Employeemodel();
                        this.httpService.employees.unshift(res.json().emp);
                      /*   this.httpService.opened[temp] = false;
                        this.httpService.openProperty = false; */
                    }

                }
            },
            err => {
                console.log(err);
            });
            
    }

    sendMailToEmployee(employeeForm: Employeemodel) {
        this.httpService.postEmailtoEmployee(employeeForm).subscribe(
            result => {
                console.log('hello');
                this.wasSent = 1;
                 setTimeout(() => {
                                 this.wasSent = 0;
                            }, 2500);
            },
            err => {
                console.log(err);
            });
    };

    getCode() {
        this.httpService.getCode().subscribe(
            result => {
                let temp = result.json().Code;
                this.model.PasswordView = temp.s.join("");
                this.model.Password = '******';
                this.wasSave = 0;
                this.newPass = 1;
                 setTimeout(() => {
                                 this.newPass = 0;
                            }, 2500);
            },
            err => {
                console.log(err);
            });

    }

} 
