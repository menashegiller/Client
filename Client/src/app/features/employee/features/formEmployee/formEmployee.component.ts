import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'as-formEmployee',
    templateUrl: 'formEmployee.html',
})
export class FormEmployeeComponent implements OnInit {
    @Input() model: Employeemodel;

    wasSave = 0;
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


    onSubmit(employeeForm: Employeemodel) {
        console.log(employeeForm);  // { first: '', last: '' }
        
        this.httpService.SaveEmployee(employeeForm).subscribe(
            res => {
                if (res.json().success) {
                    this.wasSave = 1;
                    if (!employeeForm.Person_id) {
                        this.model = new Employeemodel();
                     /*   this.httpService.GetEmployees(0, 0).subscribe(
                            result => result,
                            err => {
                                console.log(err);
                            });*/
                          this.httpService.employees.unshift(res.json().emp);
                    }
                    this.httpService.postEmail(employeeForm).subscribe(
                        result => {
                            console.log('hello');
                        },
                        err => {
                            console.log(err);
                        });
                }
            },
            err => {
                console.log(err);
            });
    }
} 
