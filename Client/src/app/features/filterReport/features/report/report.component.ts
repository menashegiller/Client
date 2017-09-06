import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';
import { AuthService } from 'common/services/auth/auth.service';
import { GridOptions } from "ag-grid";
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FilterReportModel } from 'common/Models/filterReportModel';
import { Filtermodel } from 'common/Models/filterModel';
import { MainReportModel } from 'common/Models/filterReportModel';


@Component({
    moduleId: module.id,
    selector: 'as-report',
    styles: [
        "../node_modules/ag-grid/dist/styles/ag-grid.css",
        "../node_modules/ag-grid/dist/styles/theme-fresh.css"
    ],
    templateUrl: 'report.html'
})
export class ReportComponent implements OnInit {
    public model: MainReportModel = new MainReportModel();
    private gridOptions: GridOptions;
    private rows: number;
    private rowCounter: number;
    private count: number;
    private users: User[];
    /*private usersTemp: User[];*/
    private filtered: boolean = false;

    private filterReportModel: FilterReportModel = new FilterReportModel();

    private filtermodel: Filtermodel = new Filtermodel();


    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',

    };

    private myDatePickerOptionsForLearningFinish: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',

    };

    private TypesOfFiltering = [
        { value: 'DecisionDateString', display: 'תאריך החלטה' },
        { value: 'LearningStartString', display: 'התחלת לימודים' },
        { value: 'LearningFinishString', display: 'סיום לימודים' }
    ];

    //public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    ngOnInit() {
        let self = this;
        this.httpService.GetAllUsers(this.authService.currentUser.id, "filterReport").subscribe(
            res => {
                let that = this;
                that.users =  res.json().users;
                that.count = that.users.length;
                /* that.usersTemp = that.users;*/
                if (that.users.length > 0) {
                    that.users.forEach(function (x, i) {
                        x.RegistrationDayString = x.RegistrationDate !== null ? that.dateToString(x.RegistrationDate) : null;
                        x.LearningStartString = x.LearningSrats !== null ? that.dateToString(x.LearningSrats) : null;
                        x.LearningFinishString = x.LearningFinish !== null ? that.dateToString(x.LearningFinish) : null;
                        x.DecisionDateString = x.DecisionDate !== null ? that.dateToString(x.DecisionDate) : null;
                    });
                    self.httpService.rows == 1;
                }
                else{
                    self.httpService.rows == 0;
                }
            },
            err => {
                console.log(err);
            });


    }



    constructor(public httpService: HttpService, public router: Router, private authService: AuthService) {
        let that = this;
        this.gridOptions = {
            enableFilter: true,
            enableSorting: true,
            //  floatingFilter:true,
            rowSelection: 'single',
            enableRtl: true,
            suppressContextMenu: true,
            suppressMenuMainPanel: true,
            suppressMenuColumnPanel: true,
            onFilterChanged: function () {
                that.rowCounter == 0;
                this.api.forEachNodeAfterFilter((node) => {
                    that.rowCounter++;
                });
            }// ,
            // overlayNoRowsTemplate: '<span style="padding: 10px; border: 2px solid #444; ">אין נתונים בין התריריכים</span>'
        };

        /* this.gridOptions.style.height = 100%;
         this.gridOptions.style.width = 100%;*/
        this.gridOptions.rowHeight = 50;

        this.gridOptions.columnDefs = [
            {
                headerName: "שם סטודנט/ית",
                field: "FullName",
                suppressMenu: true
                //     width: 100, 
                //   pinned: true
            },
            {
                headerName: "סטאטוס",
                field: "StatusName",
                width: 200
            },
            {
                headerName: "תאריך הגשה",
                field: "RegistrationDayString",
                width: 300,
                filter: 'date'
            },

            {
                headerName: "מכללה",
                field: "CollegeName",
                width: 200
            },
            {
                headerName: "הסמכה",
                field: "CertificationName",
                width: 200
            },
            {
                headerName: "מחיר",
                field: "TuitionFees",
                width: 200
            },
            {

                headerName: "התחלת לימודים",
                field: "LearningStartString",
                width: 200,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        if (cellValue !== null) {
                            return that.filterFunction(filterLocalDateAtMidnight, cellValue);
                        }
                    }
                }
            },
            {
                headerName: "סיום לימודים",
                field: "LearningFinishString",
                width: 200,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        if (cellValue !== null) {
                            return that.filterFunction(filterLocalDateAtMidnight, cellValue);
                        }
                    }
                }
            },
           
            {
                headerName: "החלטה בתאריך",
                field: "DecisionDateString",
                width: 200,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        if (cellValue !== null) {
                            return that.filterFunction(filterLocalDateAtMidnight, cellValue);
                        }
                    }
                }
            },
            {
                headerName: "גובה מלגה",
                field: "DecisionAmount",
                width: 200
            }

        ];

        this.gridOptions.localeText = {
            filterOoo: 'פילטור...',

            equals: 'שווה ל-',
            notEqual: 'לא שווה ל-',

            inRange: 'בתווך',
            lessThan: 'קטן מ-',
            greaterThan: 'גדול מ-',
            // for text filter
            contains: 'כולל',
            startsWith: 'מתחיל מ-',
            endsWith: 'נגמר ב-'// ,
            // noRowsToShow: 'No hay nada'
        };


    }

    filterFunc(filtermodel) {
        let that = this;
        this.rowCounter = 0;

        this.clearDateFilter('LearningStartString');
        this.clearDateFilter('LearningFinishString');
        this.clearDateFilter('DecisionDateString');
        this.filtered = null;

        let dateFilterComponent = this.gridOptions.api.getFilterInstance(this.filtermodel.FilteringField);

        dateFilterComponent.setModel({
            type: 'inRange',
            dateFrom: this.filtermodel.StartDateReal,
            dateTo: this.filtermodel.LastDateReal
        });
        this.filtered = true;
        this.gridOptions.api.onFilterChanged();

        this.gridOptions.api.forEachNodeAfterFilter((node) => {
            this.rowCounter++;
        });
        this.count = this.rowCounter;
        if (this.rowCounter == 0) {
            that.rows = 0;
            //  this.gridOptions.api.showNoRowsOverlay();
        } else {
            that.rows = 1;
            // this.gridOptions.api.hideOverlay();
        }



    };

    clearAll() {
        this.clearDateFilter('LearningStartString');
        this.clearDateFilter('LearningFinishString');
        this.clearDateFilter('DecisionDateString');
        this.filtered = null;

    }
    clearDateFilter(date) {
        let dateFilterComponent = this.gridOptions.api.getFilterInstance(date);
        dateFilterComponent.setModel({
            type: null,
            dateFrom: null,
            dateTo: null
        });
        this.gridOptions.api.onFilterChanged();
        this.rows = 1;
    }


    onDateChanged(event: IMyDateModel, propertyName: string) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('111');
        if (event.jsdate === null) {
            return;// this.user[propertyName]  = null;
        }
        else {
            //this.filtermodel[propertyName] = ;
            if (propertyName == "StartDateReal") {
                this.setOptionsforDasableUntil(event.date);
            }
            let dateAsString = event.formatted;
            let dateParts = dateAsString.split("/");
            this.filtermodel[propertyName] = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        }
    }
    dateToString(date) {
        let dateAsString = date.toString();
        let dateParts = dateAsString.split("-");
        return dateParts[2].substring(0, 2) + "/" + dateParts[1] + "/" + dateParts[0];
    }
    getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptionsForLearningFinish));
    }

    setOptionsforDasableUntil(date): void {
        let copy = this.getCopyOfOptions();
        copy.disableUntil = { year: date.year, month: date.month, day: date.day };
        this.myDatePickerOptionsForLearningFinish = copy;
    }

    filterFunction(filterLocalDateAtMidnight, cellValue) {
        let dateAsString = cellValue;

        let dateParts = dateAsString.split("/");
        let cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
        // let cellDate = cellValue;
        if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
        }

        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }

        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
    }
} 
