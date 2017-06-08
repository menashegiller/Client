import { Component } from '@angular/core';
import { Directive, OnInit, ViewChild } from '@angular/core';
import { CONSTANTS } from './shared';
import { AuthService } from 'common/services/auth/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { Router }      from '@angular/router';
import { MdlDialogService } from 'angular2-mdl';

@Component({
    moduleId: module.id,
    selector: 'as-main-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    public appBrand: string;
   

   
}
