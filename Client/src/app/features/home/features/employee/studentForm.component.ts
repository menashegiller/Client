import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';

import { DocsmodelForPdf } from 'common/Models/DocsmodelForPdf';
import { Datesmodel } from 'common/Models/datesmodel';
/*import { Datesmodel } from '../Models/datesmodel';*/
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { MdlDialogService } from 'angular2-mdl';
import { AuthService } from 'common/services/auth/auth.service';
/*import { PdfViewerComponent } from 'ng2-pdf-viewer';*/
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'as-studentform',
    templateUrl: 'studentForm.html',
    styleUrls: ['studentForm.css']
})
export class StudentFormComponent implements OnInit {
    user: User = new User();
    saveIsGood: boolean = false;
    pdfSrc: string = 'http://localhost:5002/public/uploads/Scan.pdf';
    page: number = 2;
    years = [];
    colleges = [];
    employees = [];
    employeesTemp = [];
    certifications = [];
    certificationsTemp = [];
    filesToUpload: Array<File>;
    arrayNames = Array<string>();
    docsmodelForPdf: DocsmodelForPdf = new DocsmodelForPdf();
    datesmodel: Datesmodel = new Datesmodel();
    selectedTypeOfService;
    studentId;
    docsValid: boolean = false;
    isBigfile: boolean = false;
    pageurl:SafeResourceUrl;
    // private locales:Array<string> = new Array('en','he');
    public TypesOfService = [
        { value: 0, display: 'סדיר' },
        { value: 1, display: 'קבע' },
        { value: 2, display: 'לאומי' },
        { value: 3, display: 'פטור' }
    ];
    public choices = [
        { value: 1, display: 'כן' },
        { value: 2, display: 'לא' }
    ];

    @ViewChild('loginForm') _loginForm;
    /*    private model = { date: { year: 2018, month: 10, day: 9 } };*/

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        
    };
/*
    ngOnChanges(changes: any) {
        this.saveIsGood = false;
    }*/

    ngOnInit() {
        console.log('_loginForm-->',this._loginForm);
        let currentYear = new Date().getFullYear();

       this.pageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);


        for (let i = 10; i >= 0; i--) {
            this.years.push({ id: Math.abs(i - 10), value: currentYear - i });
        }
        // console.log();
        //    let currentUser = JSON.parse(localStorage.getItem('id_token'));
        //     let token = currentUser.token;
        this.httpService.GetColleges(this.authService.currentUser.token, 1).subscribe(
            res => res,
            err => {
                console.log(err);
            });

        this.httpService.GetCertifications(0).subscribe(
            res => {
                // this.smsState = (<Response>res).ok;
                this.certificationsTemp = res.json().Certifications;
            },
            err => {
                console.log(err);
            });


        this.httpService.GetEmployees(6, 0).subscribe(
            res =>{
                // this.smsState = (<Response>res).ok;
                this.employeesTemp = res.json().Employees;
            },


            err => {
                console.log(err);
            });
            if(this.authService.currentUser.role < 8  ){
                this.studentId = this.authService.studentId;
            }
            else{
                this.studentId =this.authService.currentUser.id;
            }
        this.httpService.GetUser( this.studentId).subscribe(
            res => {
                let that = this;
                // this.smsState = (<Response>res).ok;
                that.user = res.json().user;
                //  let temp = new Date(that.user.BirthDate);
                //  that.datesmodel.BirthDate  = { date:{ year: temp.getFullYear(), month: temp.getMonth()+1, day: temp.getDate() }};
                that.datesmodel.BirthDate = that.stringToCalendarDate(that.user.BirthDate);
                that.datesmodel.LearningSrats = that.stringToCalendarDate(that.user.LearningSrats);
                that.datesmodel.LearningFinish = that.stringToCalendarDate(that.user.LearningFinish);
                that.datesmodel.ArmyDate = that.stringToCalendarDate(that.user.ArmyDate);
                that.datesmodel.SignatureDate = that.stringToCalendarDate(that.user.SignatureDate);
                that.datesmodel.ShihrurDate = that.stringToCalendarDate(that.user.ShihrurDate);
                //      var reader = new FileReader();
               
                
                that.getFileURL('Bagrut_doc');
                that.getFileURL('Toar_doc');
                that.getFileURL('Shihrur_doc');
                that.getFileURL('CV_doc');
                that.getFileURL('TZ_doc');
                that.getFileURL('IshurKabala_doc');
                that.getFileURL('Hamlaca_doc');
                that.getFileURL('Bank_doc');

                that.selectedTypeOfService = this.user.TypeOfService ? this.TypesOfService[this.user.TypeOfService].display : this.TypesOfService[0].display;
                // that.datesmodel.BirthDate = new Date(that.user.BirthDate);
                // console.log(this.user);
                if (res.json().success) {
                //    localStorage.setItem('id_token', JSON.stringify({ token: res.json().token }));
                    this.onSelect(this.user.College);
                }
               
            },
            err => {
                console.log(err);
            });
           

        this.onSelect(this.user.College);
    }

    constructor(public httpService: HttpService, public router: Router,
        public authService: AuthService, private domSanitizer:DomSanitizer,
        public dialogService: MdlDialogService) {

        //  this.setLocaleOptions();
        this.filesToUpload = [];
        for (let i = 0; i < 8; i++) {
            this.filesToUpload[i] = new File(['FileList'], 'filenameTemp');
        }
       
    }


    getFileURL(propertyName: string) {
    //  this.user[propertyName] = "http://localhost:5002/public/uploads/" + this.user[propertyName];
        if(this.user[propertyName]!=null){
        this.docsmodelForPdf[propertyName] = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:5002/public/uploads/" + this.user[propertyName]);
        }
        
    }

   

    

  
    onSelect(Id) {
        this.employees = this.employeesTemp
            .filter((item) => item.College == Id);
        this.certifications = this.certificationsTemp
            .filter((item) => item.College == Id);
    }



    onSelectionChange(entry) {
        this.selectedTypeOfService = entry.display;
    }


 /* print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('',  'top=20px,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
           <link rel="stylesheet" href="./home.css">
         <style>

          </style>
        </head>
    <body class='cleanClass' onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }*/
print(){
    window.print();
}

    stringToCalendarDate(date: Date) {
        let newDate;
        if (date !== null) {
            let temp = new Date(date);
            newDate = { date: { year: temp.getFullYear(), month: temp.getMonth() + 1, day: temp.getDate() } };
        }
        else {
            newDate = null;
        }
        return newDate;
    }
}
