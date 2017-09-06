import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { Employeemodel } from 'common/Models/Employeemodel';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormEmployeeComponent } from './features/formEmployee/formEmployee.component';
//import { AccordionComponent } from 'common/directives/accordion/index';
//import $ from "jquery";

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
    /* opened = [];
    openProperty: boolean = false; */
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

    buttonClick(event) {
        //   console.log(event.currentTarget.eventPhase);
        let temp = event.currentTarget.id;
      
        
        for (let property in this.httpService.opened) {
            if (this.httpService.opened.hasOwnProperty(property)) {
                if(property!=temp){
                    this.httpService.opened[property] = false;
                }
            }
        };
       
        if (!this.httpService.opened[temp]) {
            this.httpService.opened[temp] = true;
            this.httpService.openProperty = true;
        } else {
            this.httpService.opened[temp] = false;
            this.httpService.openProperty = false;
        }
      //  let elmnt = document.getElementById(temp);
         // this.scrollTo(0, elmnt.offsetTop, 500);
        // elmnt.scrollIntoView(true);
        let offset = temp * 68;
        $("accordion").animate({scrollTop: offset +"px" });
        document.body.scrollTop = 1470;
    //  $("accordion").scrollTop( offset );
        //window.location.hash = temp;
    }
} 
