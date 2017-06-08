import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';

import {GridOptions} from "ag-grid";

import { ReportComponent } from './features/report/report.component';

@Component({
    moduleId: module.id,
    selector: 'as-filterReport',
     styles: [
        "../node_modules/ag-grid/dist/styles/ag-grid.css",
        "../node_modules/ag-grid/dist/styles/theme-fresh.css"
    ],
    templateUrl: 'filterReport.html'
})
export class FilterReportComponent /*implements OnInit*/ {
    private gridOptions: GridOptions;
    
   /*  private params: any;

      agInit(params: any): void {
        this.params = params;
    }*/

   /* ngOnInit() {
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
        }*/

/*  onDateChanged(event: IMyDateModel, propertyName: string) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
   
        if (event.jsdate === null) {
            return;
        }
       
    }*/
 /*constructor(public httpService: HttpService, public router: Router) {
        this.gridOptions = {};
        this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Value",
                field: "value",
                cellRendererFramework: FilterReportComponent,
                width: 100
            },

        ];
        this.gridOptions.rowData = [
            {id: 5, value: 10},
            {id: 10, value: 15},
            {id: 15, value: 20}
        ];
    }*/
  

} 
