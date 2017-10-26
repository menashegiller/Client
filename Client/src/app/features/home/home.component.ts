import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { HttpService } from 'common/services/http.service';
import { Router } from '@angular/router';
import { User } from 'common/Models/user';
import { Docsmodel } from 'common/Models/docsmodel';
import { Datesmodel } from 'common/Models/datesmodel';
/*import { Datesmodel } from '../Models/datesmodel';*/
import { IMyOptions, IMyDateModel, IMyDate, IMyDateRange  } from 'mydatepicker';
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
    showAtten: boolean = false;
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
    isSent: boolean = false;
    allowSending: number = 0;
    formInvalid: boolean = false;

    @ViewChild('detailsForm')  _detailsForm: HomeComponent;
   // selDate: IMyDate = {year: 0, month: 0, day: 0};
    // private locales:Array<string> = new Array('en','he');
    public TypesOfService = [
        { value: 0, display: 'סדיר' },
        { value: 1, display: 'קבע' },
        { value: 2, display: 'לאומי' },
        { value: 3, display: 'פטור' },
        { value: 4, display: 'לא שרתתי' }
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

    private myDatePickerOptionsForLearningFinish: IMyOptions = {
         dateFormat: 'dd/mm/yyyy',
       //  disableUntil: new Date(this.user.LearningSrats)//{year: 2017, month: 7, day: 22}
    };

        

    ngOnInit() {
        console.log('_loginForm-->', this._loginForm);
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
                this.certifications = res.json().Certifications;
            },
            err => {
                console.log(err);
            });


        this.httpService.GetEmployees(6, 0).subscribe(
            res => {
                // this.smsState = (<Response>res).ok;
                this.employeesTemp = res.json().Employees;
                this.employees = res.json().Employees;
            },


            err => {
                console.log(err);
            });
        if (this.authService.currentUser.role < 8) {
            this.studentId = this.authService.studentId;
        }
        else {
            this.studentId = this.authService.currentUser.id;
        }
        this.httpService.GetUser(this.studentId).subscribe(
            res => {
                let that = this;
                // this.smsState = (<Response>res).ok;
                that.user = res.json().user;
                //  let temp = new Date(that.user.BirthDate);
                //  that.datesmodel.BirthDate  = { date:{ year: temp.getFullYear(), month: temp.getMonth()+1, day: temp.getDate() }};
              /*   that.datesmodel.BirthDate = that.stringToCalendarDate(that.user.BirthDate);
                that.datesmodel.LearningSrats = that.stringToCalendarDate(that.user.LearningSrats);
                that.datesmodel.LearningFinish = that.stringToCalendarDate(that.user.LearningFinish);
                that.datesmodel.ArmyDate = that.stringToCalendarDate(that.user.ArmyDate);
                that.user.SignatureDate = new Date();
                that.datesmodel.ShihrurDate = that.stringToCalendarDate(that.user.ShihrurDate); */
               
                that.user.BirthDateClass = that.stringToCalendarDate(that.user.BirthDate);
                that.user.LearningSratsClass = that.stringToCalendarDate(that.user.LearningSrats);
                that.user.LearningFinishClass = that.stringToCalendarDate(that.user.LearningFinish);
                that.user.ArmyDateClass = that.stringToCalendarDate(that.user.ArmyDate);
                that.user.SignatureDate = new Date();
                that.user.ShihrurDateClass = that.stringToCalendarDate(that.user.ShihrurDate);

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
               /*  if (res.json().success) {
                    //    localStorage.setItem('id_token', JSON.stringify({ token: res.json().token }));
                    this.onSelect(this.user.College);
                } */
                this.docsValidTest();

                that.setOptionsforDasableUntil(that.user.LearningSratsClass.date);
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
     
    }

    
    getOriginalFileName(propertyName: string) {
        let value = this.user[propertyName];
        if (value) {
            let leng = value.length;
            this.docsmodel[propertyName] = value.slice(0, leng - 18) + value.slice(leng - 4, leng);
        }
    }

    onDateChanged(event: IMyDateModel, propertyName: string) {
        if (event.jsdate === null) {
            this.user[propertyName]  = null;
            //return
        }
        else {
            this.user[propertyName] = event.jsdate.toUTCString();
            if(propertyName=="LearningSrats"){
                this.setOptionsforDasableUntil(event.date);
            }
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
            this.docsmodel[fileInput.target.name] = 'קובץ לא צורף';
        } 
        this.docsValidTest();
    }
  
    docsValidTest() {
        let tempText = 'קובץ לא צורף';
        if (this.docsmodel.CV_doc == tempText || this.docsmodel.TZ_doc == tempText
            || this.docsmodel.IshurKabala_doc == tempText || this.docsmodel.Hamlaca_doc == tempText
            || this.docsmodel.Bank_doc == tempText) {
            this.docsValid = false;
        }
        else {
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
    sendtoStudent() {
        event.preventDefault();
        let that = this;

        /*     let validadress=null;
                if(user.Adress == null){
        validadress="Enter adress";
                }*/

        let result = 
        this.dialogService.confirm(
            '<p>ברגע שתשלח/י את המסמכים לא ניתן לערוך את אותם לכן מומלץ לבדוק שוב את הטופס ולאחר מכן ללחוץ על שלח</p>',
             'חזרה לטופס', 'שלח/י טופס', 'חשוב לזכור'); 

        result.subscribe(() => 
        {
             that.httpService.sendtoStudent(this.authService.currentUser.id,
                                            this.authService.currentUser.email,
                                            this.authService.currentUser.fullname
                                        ).subscribe(
                res => {

            
                   this.allowSending = 2;
                // if you only need the confirm answer
                setTimeout(() => {
                    this.allowSending = 3;
                    this.router.navigate(['/studentForm']);
                 }, 3000);

                },
                (err) => {
                    console.log(err);

                });  
        },
        (err: any) => {
        console.log('declined');
        });
       

      
    }


    saveAll(user,ifAten:boolean) {
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
                        if(ifAten){
                            that.showAtten = res.json().success;
                        
                            setTimeout(() => {
                                that.showAtten = false;
                            }, 6000);
                        }

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


   
    print() {
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

    /*focusFunc(event){
        event.currentTarget.focus();
        this.router.navigate(['/forgetpsw'])
    }*/

    goto(location: string, formdata,formName): void { 
       
        if(!formdata){
            window.location.hash = location;
            return; 
        }
    
        if(formdata.form.valid&&formName=='detailsForm'&&this.user.BirthDateClass){
            window.location.hash = location;
        }else if(formdata.form.invalid) {
             window.location.hash = "detailsForma";
        } else
        if(formdata.form.valid&&formName=='collegeForm'&&this.user.LearningSratsClass&&this.user.LearningFinishClass){
            window.location.hash = location;
        } else
        if(formdata.form.valid&&formName=='docsForm'&& this.docsValid){
            window.location.hash = location;
        }
        else{
            this.formInvalid = true;
            setTimeout(() => {
                   this.formInvalid = false;
                }, 6000);
        }
        
        //this.saveAll(this.user);
    }
    Save(): void {
        this.authService.currentUser.fullname = this.user.FullName;
        if(this.allowSending != 2){
            this.saveAll(this.user,false);
        }
    }

     getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptionsForLearningFinish));
    }

    setOptionsforDasableUntil(date):void{
        let copy = this.getCopyOfOptions();
        copy.disableUntil = {year: date.year, month: date.month, day: date.day};
        this.myDatePickerOptionsForLearningFinish = copy;
    }

    Jump():void{
       document.body.scrollTop = 638; 
    }
}
