import { Headers } from '@angular/http';

export class BaseService {
    protected contentHeadersBase:Headers;
    constructor(){
        this.contentHeadersBase = new Headers();
        
        this.contentHeadersBase.append('Accept', 'application/json;q=0.9,*/*;q=0.8');
        this.contentHeadersBase.append('Content-Type', 'application/x-www-form-urlencoded,application/json,charset=utf-8');
       // this.contentHeadersBase.append('X-UA-Compatible', 'IE=edge');
        // this.contentHeaders.append('Access-Control-Allow-Origin', '*');
        // this.contentHeaders.append('Access-Control-Allow-Headers', '*');
    }
}