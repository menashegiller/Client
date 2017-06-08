import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormEmployeeComponent } from './features/formEmployee/formEmployee.component';


@Component({
    moduleId: module.id,
    selector: 'as-Employee',
    templateUrl: 'employee.html',
    styleUrls: ['employee.css']
})
export class EmployeeComponent implements OnInit {
    employees = [];
    colleges = [];
    roles = [];
    employeemodel = new Employeemodel();
    @ViewChild('emplForm') private _employeeForm: FormEmployeeComponent;

    ngOnInit() {
        this.httpService.GetEmployees(0, 0).subscribe(
            res => res,
            err => {
                console.log(err);
            });
     }

    constructor(public httpService: HttpService, public router: Router/*, private localeService: LocaleService*/) {
    }
} 
