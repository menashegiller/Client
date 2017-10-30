import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { WorkerReportModel } from 'common/Models/WorkerReportModel';
import { Docsmodel } from 'common/Models/docsmodel';
import { Datesmodel } from 'common/Models/datesmodel';
/*import { Datesmodel } from '../Models/datesmodel';*/
import { IMyOptions, IMyDateModel, IMyDate, IMyDateRange  } from 'mydatepicker';
import { MdlDialogService } from 'angular2-mdl';
import { AuthService } from 'common/services/auth/auth.service';
/*import { PdfViewerComponent } from 'ng2-pdf-viewer';*/

@Component({
    moduleId: module.id,
    selector: 'as-worker',
    templateUrl: 'workerReport.html'
})
export class WorkerReportComponent implements OnInit {
    reasons = [];
    reasonsTemp = [];
    saveIsGood: boolean = false;
    liHide: boolean = false;

    WRmodel: WorkerReportModel = new WorkerReportModel();


   // selDate: IMyDate = {year: 0, month: 0, day: 0};
    // private locales:Array<string> = new Array('en','he');

  
    /*    private model = { date: { year: 2018, month: 10, day: 9 } };*/

        

    ngOnInit() {

      

        this.httpService.getReasons().subscribe(
            res => {
                // this.smsState = (<Response>res).ok;
               
                this.reasons = res.json().Reasons;
             
            },
            err => {
                console.log(err);
            });
     
         this.httpService.GetWorkerReportByPId(this.authService.currentUser.id).subscribe(
                res => {
                    let that = this;
                    // this.smsState = (<Response>res)
                    if(res.report){
                        that.WRmodel = res.report;
                    }
                    that.WRmodel.DateObj = new Date();
                },
                err => {
                    console.log(err);
                });


        
    }

    constructor(public httpService: HttpService, public router: Router,
        public authService: AuthService,
        public dialogService: MdlDialogService) {

     //  this.setLocaleOptions();
      
     
    }
    SaveWorkerReport(model,last){
        let pid = this.authService.currentUser.id;
        let lastChange = this.httpService.wordersReportEntity.lastChange;
        let ID = this.httpService.wordersReportEntity.id;
        model.DateObj = new Date();
        
        this.httpService.SaveWorkerReport(model, pid, last, ID, lastChange).subscribe(
            res => {
                if(last == 1){
                    this.saveIsGood = res.json().success;
                }
               /*  if(ifAten){
                    this.showAtten = res.json().success;
                
                    setTimeout(() => {
                        this.showAtten = false;
                    }, 6000);
                } */

            },
            (err) => {
                console.log(err);

            });

 
        }

    Send(model){
        let result = this.dialogService.confirm(
            '<p>ברגע שתשלח/י את המסמכים לא ניתן לערוך את אותם לכן מומלץ לבדוק שוב את הטופס ולאחר מכן ללחוץ על שלח</p>',
             'חזרה לטופס', 'שלח/י טופס', 'חשוב לזכור'); 
        
             result.subscribe(() => 
             {
                this.SaveWorkerReport(model,1);
             },
             (err: any) => {
             console.log('declined');
             });
    }
       
}
