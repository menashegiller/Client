import { Headers } from '@angular/http';

export class BaseService {
    protected contentHeadersBase:Headers;
    constructor(){
        this.contentHeadersBase = new Headers();
        
        this.contentHeadersBase.append('Accept', 'application/json');
        this.contentHeadersBase.append('Content-Type', 'application/x-www-form-urlencoded,application/json');
        // this.contentHeaders.append('Access-Control-Allow-Origin', '*');
        // this.contentHeaders.append('Access-Control-Allow-Headers', '*');
    }
}