import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { User } from '../../Models/user';
import { Login } from 'common/Models/login.interface';
import { BaseService } from '../base-service/base.service';
import { LocalStorage } from 'common/modules/webStorage/index';

export interface IUser{
   isLoggedIn: boolean;
   email: string;
   id: number;
   token: string;
   role: number;
   fullname: string;
   FormStatus: number;
}
@Injectable()
export class AuthService extends BaseService {
/// TODO: integrate Angular2 @LocalStorage (https://github.com/marcj/angular2-localstorage)
@LocalStorage() public currentUser:IUser;
@LocalStorage() public rememberMe:boolean;
@LocalStorage() public studentId:boolean;
 pageName: string = "";
// isLoggedIn: boolean = false;
 email:string;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  ifPrint:boolean = false;
  constructor(public http: Http) {
    super();
    this.currentUser = {
      'isLoggedIn': false,
      'email': '',
      'id': 0,
      'token': '',
      'role': 0,
      'fullname': '',
      'FormStatus':0
     // 'fpState': JSON.stringify({ fp:0 })
    };
  }
 login(user: User): Observable<boolean>  {
        let params = new URLSearchParams();
        params.set('email', user.Email);
        params.set('pass', user.passWord);
        return this.http.post('/users/authenticate', params, { headers: this.contentHeadersBase })
                    .map(res => {
                      // this.currentUser = res.json();????

                      let resObj = res.json();
                      this.currentUser = {
                        'isLoggedIn': resObj.success,
                        'email': resObj.obj.Email,
                        'id': resObj.obj.Person_id,
                        'token': resObj.token,
                        'role': resObj.obj.Role,
                        'fullname': resObj.obj.FullName,
                        'FormStatus': resObj.obj.FormStatus
                       // 'fpState': JSON.stringify({ fp:0 })
                      };

                   
                  })
                  .catch((error: any ) => {
                    return Observable.throw(error); 
                  });
 }


loginWithSmsOrEmailCode( passWord,emailOrSms,pid): Observable<any> {
        let params = new URLSearchParams();
        params.set('pid', pid);
        params.set('Code', passWord);
        params.set('SmsOrEmail',emailOrSms);
        return this.http.post('/users/loginWithSmsOrEmailCode', params, { headers: this.contentHeadersBase })
                  .map(res => {

                    let resObj = res.json();
                      this.currentUser = {
                        'isLoggedIn': resObj.success,
                        'email': resObj.obj.Email,
                        'id': resObj.obj.Person_id,
                        'token': resObj.token,
                        'role': resObj.obj.Role,
                         'fullname': resObj.obj.FullName,
                         'FormStatus': resObj.obj.FormStatus
                       // 'fpState': JSON.stringify({ fp:0 })
                      };

                
                  

                  })
                  .catch((error: any ) => {
                    return Observable.throw(error); 
                  });
    }



logout(): void {
  this.currentUser = { 
    'isLoggedIn': false,
    'email': null,
    'id': null,
    'token': null,
    'role': null,
    'fullname': null,
    'FormStatus': null
  };
    
   /* localStorage.removeItem('id_token');*/
    localStorage.removeItem('fpState');
    localStorage.removeItem('isEmployee');
     this.pageName = "";
  }
}
