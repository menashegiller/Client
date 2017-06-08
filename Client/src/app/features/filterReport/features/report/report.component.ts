import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';

import {GridOptions} from "ag-grid";

/*import * as moment from 'moment';*/

@Component({
    moduleId: module.id,
    selector: 'as-report',
    // styles: [
    //     "../node_modules/ag-grid/dist/styles/ag-grid.css",
    //     "../node_modules/ag-grid/dist/styles/theme-fresh.css"
    // ],
    templateUrl: 'report.html'
})
export class ReportComponent implements OnInit {
    private gridOptions: GridOptions;
    private users: User[];

    ngOnInit() {
            this.httpService.GetAllUsers(0).subscribe(
               res => {
                this.users = res.json().users;
           
            },
            err => {
                console.log(err);
            });

                
        }


    constructor(public httpService: HttpService, public router: Router/*, private localeService: LocaleService*/) {
        this.gridOptions = {
             enableFilter: true
        };
        
        this.gridOptions.rowHeight = 200;

        this.gridOptions.columnDefs = [
            {
                headerName: "שם סטודנט/ית",
                field: "FullName",
           //     width: 100, 
                pinned: true
            },
            {
                headerName: "תאריך הגשה",
                field: "RegistrationDate",
                width: 100,
                filter: 'number'
            },
             {
                headerName: "מכללה",
                field: "CollegeName",
                width: 100
            },
            {
                headerName: "הסמכה",
                field: "CertificationName",
                width: 100
            },
            {
                headerName: "מחיר",
                field: "TuitionFees",
                width: 100
            },
             {
                headerName: "התחלת לימודים",
                field: "LearningSrats",
                width: 100,
               /* cellFormatter: function(data) {
                        return moment(data.value).format('L');
                    }*/
            },
            {
                headerName: "סיום לימודים",
                field: "LearningFinish",
                width: 100
            },
             {
                headerName: "סטאטוס",
                field: "FormStatus",
                width: 100
            },
             {
                headerName: "החלטה בתאריך",
                field: "FullName",
                width: 100
            },
             {
                headerName: "גובה מלגה",
                field: "Decision",
                width: 100
            }

        ];
/*        this.gridOptions.rowData = [
            {id: 5, value: 10},
            {id: 10, value: 15},
            {id: 15, value: 20}
        ];
*/
      /*  this.gridOptions.localeText = {
        // for filter panel
        page: 'daPage',
        more: 'daMore',
        to: 'daTo',
        of: 'daOf',
        next: 'daNexten',
        last: 'daLasten',
        first: 'daFirsten',
        previous: 'daPreviousen',
        loadingOoo: 'daLoading...',
        // for set filter
        selectAll: 'daSelect Allen',
        searchOoo: 'daSearch...',
        blanks: 'daBlanc',
        // for number filter and text filter
        filterOoo: 'daFilter...',
        applyFilter: 'daApplyFilter...',
        // for number filter
        equals: 'daEquals',
        notEqual: 'daNotEquals',
        lessThanOrEqual: 'daLessThanOrEqual',
        greaterThanOrEqual: 'daGreaterThanOrEqual',
        inRange:'daInRange',
        lessThan: 'daLessThan',
        greaterThan: 'daGreaterThan',
        // for text filter
        contains: 'daContains',
        startsWith: 'daStarts dawith',
        endsWith: 'daEnds dawith',
        // the header of the default group column
        group: 'laGroup',
        // tool panel
        columns: 'laColumns',
        rowGroupColumns: 'laPivot Cols',
        rowGroupColumnsEmptyMessage: 'la please drag cols to group',
        valueColumns: 'laValue Cols',
        pivotMode: 'laPivot-Mode',
        groups: 'laGroups',
        values: 'laValues',
        pivots: 'laPivots',
        valueColumnsEmptyMessage: 'la drag cols to aggregate',
        pivotColumnsEmptyMessage: 'la drag here to pivot',
        // other
        noRowsToShow: 'la no rows',
        // enterprise menu
        pinColumn: 'laPin Column',
        valueAggregation: 'laValue Agg',
        autosizeThiscolumn: 'laAutosize Diz',
        autosizeAllColumns: 'laAutsoie em All',
        groupBy: 'laGroup by',
        ungroupBy: 'laUnGroup by',
        resetColumns: 'laReset Those Cols',
        expandAll: 'laOpen-em-up',
        collapseAll: 'laClose-em-up',
        toolPanel: 'laTool Panelo',
        // enterprise menu pinning
        pinLeft: 'laPin <<',
        pinRight: 'laPin >>',
        noPin: 'laDontPin <>',
        // enterprise menu aggregation and status panel
        sum: 'laSum',
        min: 'laMin',
        max: 'laMax',
        first: 'laFirst',
        last: 'laLast',
        none: 'laNone',
        count: 'laCount',
        average: 'laAverage',
        // standard menu
        copy: 'laCopy',
        ctrlC: 'ctrl n C',
        paste: 'laPaste',
        ctrlV: 'ctrl n C'
    }*/
              
         
    }
} 
