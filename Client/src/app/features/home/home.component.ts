import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';
import { Docsmodel } from 'common/Models/docsmodel';
import { Datesmodel } from 'common/Models/datesmodel';
/*import { Datesmodel } from '../Models/datesmodel';*/
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { MdlDialogService } from 'angular2-mdl';
import { AuthService } from 'common/services/auth/auth.service';
/*import { PdfViewerComponent } from 'ng2-pdf-viewer';*/

@Component({
    moduleId: module.id,
    selector: 'as-home',
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    user: User = new User();
    saveIsGood: boolean = false;
    pdfSrc: string = 'assets/images/output.pdf';
    page: number = 2;
    years = [];
    colleges = [];
    employees = [];
    employeesTemp = [];
    certifications = [];
    certificationsTemp = [];
    filesToUpload: Array<File>;
    arrayNames = Array<string>();
    docsmodel: Docsmodel = new Docsmodel();
    datesmodel: Datesmodel = new Datesmodel();
    selectedTypeOfService;
    studentId;
    docsValid: boolean = false;
    isBigfile: boolean = false;

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

                that.getOriginalFileName('Bagrut_doc');
                that.getOriginalFileName('Toar_doc');
                that.getOriginalFileName('Shihrur_doc');
                that.getOriginalFileName('CV_doc');
                that.getOriginalFileName('TZ_doc');
                that.getOriginalFileName('IshurKabala_doc');
                that.getOriginalFileName('Hamlaca_doc');
                that.getOriginalFileName('Bank_doc');

                that.selectedTypeOfService = this.user.TypeOfService ? this.TypesOfService[this.user.TypeOfService].display : this.TypesOfService[0].display;
                // that.datesmodel.BirthDate = new Date(that.user.BirthDate);
                // console.log(this.user);
                if (res.json().success) {
                //    localStorage.setItem('id_token', JSON.stringify({ token: res.json().token }));
                    this.onSelect(this.user.College);
                }
                  this.docsValidTest();
            },
            err => {
                console.log(err);
            });
           

        this.onSelect(this.user.College);
    }

    constructor(public httpService: HttpService, public router: Router,
        public authService: AuthService,
        public dialogService: MdlDialogService) {

        //  this.setLocaleOptions();
        this.filesToUpload = [];
        for (let i = 0; i < 8; i++) {
            this.filesToUpload[i] = new File(['FileList'], 'filenameTemp');
        }
        //         let result = this.dialogService.alert('ההרשמה הסתיימה בהצלחה'+
        // 'תשובה על הרשמתך תשלח למייל שלך כפי שציינת בפרטים האישיים, תודה על השקעתך בהצלחה');
        //         result.subscribe( () => console.log('alert closed') );
        /* let result = this.dialogService.confirm('Would you like a mug of coffee?',null, 'סגור');
        // if you need both answers
        result.subscribe( () => {
            console.log('confirmed');
            },
            (err: any) => {
            console.log('declined');
            }
        );
        // if you only need the confirm answer
        result.onErrorResumeNext().subscribe( () => {
            console.log('confirmed 2');
        });*/
    }

    /* setLocaleOptions(): void {
            let opts: IMyOptions = this.localeService.getLocaleOptions(this.locale);
            Object.keys(opts).forEach((k) => {
                (<IMyOptions>this.opts)[k] = opts[k];
            });
        }*/
    getOriginalFileName(propertyName: string) {
        let value = this.user[propertyName];
        if (value) {
            let leng = value.length;
            this.docsmodel[propertyName] = value.slice(0, leng - 18) + value.slice(leng - 4, leng);
        }
    }

    onDateChanged(event: IMyDateModel, propertyName: string) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('111');
        if (event.jsdate === null) {
            return;// this.user[propertyName]  = null;
        }
        else {
            this.user[propertyName] = event.jsdate.toUTCString();
        }
    }
    /*  upload() {
          
      }*/
    fileChangeEvent(fileInput: any) {
        // this.filesToUpload = <Array<File>> fileInput.target.files;
        
        if (fileInput.target.files.length > 0) {
            if (fileInput.target.files[0].size > 2024000) {
                let result = this.dialogService.alert('הקובץ מידי גדול');
              //  result.subscribe( () => (this.router.navigate(['/forgetpsw'])));
                return;
            }

            fileInput.target.title = 'החלפת קובץ';

            this.filesToUpload[fileInput.target.name] = <File>fileInput.target.files[0];
            this.docsmodel[fileInput.target.name] = <File>fileInput.target.files[0].name;
            if (!this.arrayNames.includes(fileInput.target.name)) {
                this.arrayNames.push(fileInput.target.name);
            }
        }
        else {
            fileInput.target.title = 'בחירת קובץ';
            this.docsmodel[fileInput.target.name] =  'קובץ לא צורף';
        }
         this.docsValidTest();
    }

    docsValidTest(){
        let tempText = 'קובץ לא צורף';
         if(this.docsmodel.CV_doc== tempText || this.docsmodel.TZ_doc== tempText 
            || this.docsmodel.IshurKabala_doc== tempText || this.docsmodel.Hamlaca_doc== tempText 
            || this.docsmodel.Bank_doc== tempText ){
            this.docsValid = false;
        }
        else{
             this.docsValid = true;
        }
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, arrayNames: Array<string>) {
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
            for (let i = 0; i < arrayNames.length; i++) {
                let temp = arrayNames[i];
                formData.append('uploads', files[temp], files[temp].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.authService.currentUser.token);
            
            xhr.send(formData);
        });
    }

    onSelect(Id) {
        this.employees = this.employeesTemp
            .filter((item) => item.College == Id);
        this.certifications = this.certificationsTemp
            .filter((item) => item.College == Id);
    }
sendtoStudent(){
    event.preventDefault();
      let that = this;
     
/*     let validadress=null;
        if(user.Adress == null){
validadress="Enter adress";
        }*/
  that.httpService.sendtoStudent(this.authService.currentUser.id).subscribe(
                    res => {
                       
          let result = this.dialogService.alert('ההרשמה הסתיימה בהצלחה'+
             'תשובה על הרשמתך תשלח למייל שלך כפי שציינת בפרטים האישיים, תודה על השקעתך בהצלחה');
                result.subscribe( () => (this.router.navigate(['/forgetpsw'])));
        
        // if you only need the confirm answer
     

                    },
                    (err) => {
                        console.log(err);

                    });
                   
}


    saveAll(user) {
        event.preventDefault();
        let that = this;
      
   
        this.makeFileRequest('http://localhost:5002/users/upload', [], this.filesToUpload, this.arrayNames)
            .then((result) => {
                console.log(result);
                for (let i = 0; i < that.arrayNames.length; i++) {
                    let temp = that.arrayNames[i];
                    that.user[temp] = result[i].filename;
                }

               
                let pid = this.authService.currentUser.id;

                /*  user.BirthDate = this.user.BirthDate;
                  user.LearningSrats = this.user.LearningSrats;
                  user.LearningFinish = this.user.LearningFinish;
                  user.ArmyDate = this.user.ArmyDate;
                  user.SignatureDate = this.user.SignatureDate;
                  user.ShihrurDate = this.user.ShihrurDate;*/
                that.httpService.saveFormToDB(user, pid).subscribe(
                    res => {
                        that.saveIsGood = res.json().success;
                     
                    },
                    (err) => {
                        console.log(err);

                    });

                //   user.
            }, (error) => {
                console.error(error);
            });
        //  this.router.navigate(['/forgetpsw']);
    }

   /* changeChecking() {
        if (this.httpService.isEmployee) {
            return;
        }
        else {
            this.user.Fighter == 1 ? this.user.Fighter = null : this.user.Fighter = 1;
        }
    }*/

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
