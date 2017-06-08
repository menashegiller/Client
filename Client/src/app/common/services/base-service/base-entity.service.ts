import { Injector } from '@angular/core';
import { Headers } from '@angular/http';
import { BaseService } from './base.service';
import { AuthService } from '../auth/auth.service';

export class BaseEntityService extends BaseService {
    private _authService:AuthService;
    constructor(private injector:Injector){
        super();
        this._authService = injector.get(AuthService);
        
    }
    get contentHeaders() {
        let headers =  new Headers(this.contentHeadersBase);
        if(this._authService.currentUser){
            headers.append('Authorization', 'Bearer ' + this._authService.currentUser.token);
        }
        return headers;
    }
}