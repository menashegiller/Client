import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LocalStorage } from 'common/modules/webStorage/index';
import { BaseEntityService } from './base-service/base-entity.service';
// import * as $ from 'jquery';

export interface IReport{
  id: number;
  lastChange: number;
}

@Injectable()
export class HttpService extends BaseEntityService {
  @LocalStorage() public fpState: number = 0;
  @LocalStorage() public isEmployee: boolean = true;
  @LocalStorage() public wordersReportEntity:IReport;
  fullname:string;
  colleges = [];
  roles = [];
  employees = [];
  // isEmployee = 0;
  isGood = 0;
  pid = 0;
  Shinuy: number = 0;
  rows: number ;
  opened = [];
  openProperty: boolean = false;


  constructor(injector: Injector, private http: Http) {
    super(injector);
  }

  Serialize = function (obj) {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  };

  sendCode(contactInfo, EmailOrSms): Observable<any> {
    let params = new URLSearchParams();

    params.set('contactInfo', contactInfo);
    params.set('EmailOrSms', EmailOrSms);
    return this.http.post('/users/sendCodeServerSide', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  getCode(): Observable<any> {
    let params = new URLSearchParams();
   // params.set('email', EmailOrSms);
    return this.http.post('/users/getCode', params, { headers: this.contentHeaders })
      .map(res => {
        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  getReasons(): Observable<any> {
    let params = new URLSearchParams();
   // params.set('email', EmailOrSms);
    return this.http.post('/users/getReasons', params, { headers: this.contentHeaders })
      .map(res => {
        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  saveNewPassword(passWord1, pid): Observable<any> {
    let params = new URLSearchParams();

    params.set('passWord', passWord1);
    params.set('pid', pid);
    return this.http.post('/users/SaveNewPassword', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }
  sendtoStudent(pid,email,name): Observable<any> {
    let params = new URLSearchParams();
    params.set('pid', pid);
    params.set('email', email);
    params.set('fullname', name);

    return this.http.post('/users/CloseForChanges', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  SaveWorkerReport(model, pid, last, ID,lastChange): Observable<any> {
    let params = new URLSearchParams();
  
    
    params.set('pid', pid);
    params.set('isWork', model.isWork);
    params.set('reasonNotWork', model.reasonNotWork);
    params.set('workName', model.workName);
    params.set('employerName', model.employerName);
    params.set('isWorkOnProfession', model.isWorkOnProfession);
    params.set('salaryAvg', model.salaryAvg);
    params.set('workRole', model.workRole);
    params.set('projectName', model.projectName);
    params.set('technologics', model.technologics);
    params.set('lastChange', lastChange);
    params.set('newlastChange', last);
    params.set('DateObj', model.DateObj);
    params.set('id', ID);

    return this.http.post('/users/SaveWorkerReport', params, { headers: this.contentHeaders })
    .map(res => {
      //  this.isLoggedIn = res.json().success;

      return res;
    })
    .catch((error: any) => { return Observable.throw(error); });;

  }


  GetWorkerReportByPId(pid): Observable<any> {
    let params = new URLSearchParams();
  
    params.set('pid', pid);
    

    return this.http.post('/users/GetWorkerReportByPId', params, { headers: this.contentHeaders })
    .map(res => {
      let resObj = res.json();
      this.wordersReportEntity = {
        'id':  resObj.report.id,
        'lastChange': resObj.report.lastChange
      };
      return resObj;
    })
    .catch((error: any) => { return Observable.throw(error); });;

  }

  saveFormToDB(user, pid): Observable<any> {
    let params = new URLSearchParams();

    params.set('pid', pid);
    params.set('FullName', user.FullName);
    params.set('College', user.College);
    params.set('Mobile', user.Mobile);
    // params.set('Last_Name', user.Last_Name);

    params.set('BirthDate', user.BirthDate !== null ? user.BirthDate : null);
    params.set('LearningSrats', user.LearningSrats !== null ? user.LearningSrats : null);
    params.set('ArmyDate', user.ArmyDate !== null ? user.ArmyDate : null);
    params.set('LearningFinish', user.LearningFinish !== null ? user.LearningFinish : null);
    params.set('SignatureDate', user.SignatureDate !== null ? user.SignatureDate : null);
    params.set('ShihrurDate', user.ShihrurDate !== null ? user.ShihrurDate : null);
    params.set('FamalyStatus', user.FamalyStatus);
    params.set('BirthState', user.BirthState);
    params.set('AliyaYear', user.AliyaYear!="0"?user.AliyaYear:null);
    params.set('Adress', user.Adress);
    params.set('Volunteer', user.Volunteer);
    params.set('CertificationName', user.CertificationName);
    
    params.set('Bagrut_doc', user.Bagrut_doc);
    params.set('Toar_doc', user.Toar_doc);
    params.set('Shihrur_doc', user.Shihrur_doc);
    params.set('CV_doc', user.CV_doc);
    params.set('TZ_doc', user.TZ_doc);
    params.set('IshurKabala_doc', user.IshurKabala_doc);
    params.set('Hamlaca_doc', user.Hamlaca_doc);
    params.set('Bank_doc', user.Bank_doc);
    params.set('WhyScholarship', user.WhyScholarship);
    params.set('WhyProfession', user.WhyProfession);
    params.set('SpecialSituations', user.SpecialSituations);
    params.set('PersonalNumber', user.PersonalNumber);
    params.set('Fighter', user.Fighter);
    params.set('TypeOfService', user.TypeOfService);
    params.set('HaveFlat', user.HaveFlat);
    params.set('HaveCar', user.HaveCar);
    params.set('HaveWork', user.HaveWork);
    params.set('Work', user.Work);
    params.set('Parents', user.Parents);
    params.set('Loan', user.Loan);
    params.set('SignatureName', user.SignatureName);
    params.set('SallaryAvg', user.SallaryAvg);
    params.set('SallaryAvg24', user.SallaryAvg24);+
    params.set('WorkPlace', user.WorkPlace);
    params.set('WorkPlace24', user.WorkPlace24);
    params.set('Employee_Id', user.Employee_Id);
    params.set('LoanAvg', user.LoanAvg);
    params.set('LoanPlace', user.LoanPlace);
    params.set('OtherText', user.OtherText);
    params.set('Other', user.Other);
    params.set('ArmyDegree', user.ArmyDegree);
    params.set('ArmyRole', user.ArmyRole);
    params.set('ReasonForExemption', user.ReasonForExemption);
    params.set('Certification_Id', user.Certification_Id);
    params.set('NotServe', user.NotServe);

    //  params.set('Email', user.Email);
    params.set('TuitionFees', user.TuitionFees);

    return this.http.post('/users/saveForm', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  GetCertifications(College): Observable<any> {
    let params = new URLSearchParams();

    params.set('College', College);
    return this.http.post('/users/getCertifications', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }



  GetColleges(token, isCollege): Observable<any> {
    let params = new URLSearchParams();

    params.set('isCollege', isCollege);

    if (this.colleges.length == 0) {
      return this.http.post('/users/getColleges', params, new RequestOptions({ headers: this.contentHeaders }))
        .map(res => {
          //  this.isLoggedIn = res.json().success;
          this.colleges = res.json().Colleges;
          return this.colleges;
        })
        .catch((error: any) => { return Observable.throw(error); });;
    }
    else {
      return Observable.throw(this.colleges);
    }
  }

  GetRoles(token): Observable<any> {
    let params = new URLSearchParams();
    params.set('token', token);
    if (this.roles.length == 0) {
      return this.http.post('/users/getRoles', params, { headers: this.contentHeaders })
        .map(res => {
          //  this.isLoggedIn = res.json().success;
          this.roles = res.json().Roles;
          return this.roles;
        })
        .catch((error: any) => { return Observable.throw(error); });;
    }
    else {
      return Observable.throw(this.roles);
    }
  }

  GetEmployees(Role, College): Observable<any> {
    let params = new URLSearchParams();

    // params.set('token', token);

    params.set('Role', Role);
    params.set('College', College);

    return this.http.post('/users/getEmployees', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;
        this.employees = res.json().Employees;
        return res; //this.employees;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  SaveEmployee(employeeForm): Observable<any> {
    let params = new URLSearchParams();
   
    params.set('Person_id', employeeForm.Person_id ? employeeForm.Person_id : 0);
    params.set('FullName', employeeForm.FullName);
    params.set('Email', employeeForm.Email);
    params.set('Role', employeeForm.Role);
    params.set('College', employeeForm.College);
    params.set('Mobile', employeeForm.Mobile);
    params.set('Password', employeeForm.PasswordView); //if PasswordView == null in sql will not save it
    return this.http.post('/users/saveEmployee', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;

  }
  GetUser(pid): Observable<any> {
    let params = new URLSearchParams();

    params.set('pid', pid);
    //  params.set('token', token);
    return this.http.post('/users/GetUser', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  GetAllUsers(id, page): Observable<any> {
    let params = new URLSearchParams();


    params.set('id', id);
    params.set('page', page);

    return this.http.post('/users/GetAllUsers', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;

        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  postEmailtoEmployee(obj): Observable<any> {
    let params = new URLSearchParams();
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // var token = currentUser.token; 
    // params.set('user',token);
    params.set('emailadress', obj.Email);
    params.set('password', obj.PasswordView);
    params.set('name', obj.FullName);

    return this.http.post('/users/postEmailtoEmployee', params, { headers: this.contentHeaders }).map(res => {
      //  localStorage.setItem('id_token', res.json().token);
      return res;
    })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  saveAndSendEmailtoNewEmployee(employeeForm): Observable<any> {
    let params = new URLSearchParams();
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // var token = currentUser.token; 
    // params.set('user',token);
   params.set('Person_id', employeeForm.Person_id ? employeeForm.Person_id : 0);
    params.set('FullName', employeeForm.FullName);
    params.set('Email', employeeForm.Email);
    params.set('Role', employeeForm.Role);
    params.set('College', employeeForm.College);
    params.set('Mobile', employeeForm.Mobile);
    params.set('Password', employeeForm.PasswordView); //if PasswordView == null in sql will not save it
    return this.http.post('/users/saveAndSendEmailtoNewEmployee', params, { headers: this.contentHeaders }).map(res => {
      //  localStorage.setItem('id_token', res.json().token);
      return res;
    })
      .catch((error: any) => { return Observable.throw(error); });;
  }


  register(user): Observable<any> {
    let params = new URLSearchParams();

    params.set('emailadress', user.Email);
    params.set('IdentityId', user.UserId);
    return this.http.post('/users/register', params, { headers: this.contentHeaders })
      .map(res => {
        let result = res.json();
        if (result.success) {
          this.isGood = 1;
          this.pid = result.pid;
        } else {
          this.isGood = -1;
          setTimeout(() => {
            this.isGood = 0;
          }, 5000);
        }
        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }

  sendDecision(user): Observable<any> {
    let params = new URLSearchParams();
    let Temp;
    if(user.DecisionAmount  && user.FormStatus ==3){
      Temp = user.DecisionAmount;
    } else{
      Temp = '';
    }
    params.set('Person_id', user.Person_id);
    params.set('FormStatus', user.FormStatus);
    params.set('DecisionAmount', Temp);
    params.set('DecisionReasons', user.DecisionReasons);

    return this.http.post('/users/sendDecision', params, { headers: this.contentHeaders })
      .map(res => {
        return res;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }
}
