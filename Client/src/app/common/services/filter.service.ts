import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BaseEntityService } from './base-service/base-entity.service';
// import * as $ from 'jquery';
@Injectable()
export class FilterService extends BaseEntityService {
  users: User[];

  constructor(injector: Injector, private http: Http) {
    super(injector);
  }

   GetAllUsers(token): Observable<any> {
    let params = new URLSearchParams();

    params.set('token', token);
    return this.http.post('http://localhost:5002/users/GetAllUsers', params, { headers: this.contentHeaders })
      .map(res => {
        //  this.isLoggedIn = res.json().success;
        this.users = res.json().users;
        return  this.users;
      })
      .catch((error: any) => { return Observable.throw(error); });;
  }
}
