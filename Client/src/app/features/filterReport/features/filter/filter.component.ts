import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilterService } from 'common/services/filter.service';
import { Router } from '@angular/router';

import { Filtermodel } from 'common/Models/filterModel';

import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { ReportComponent } from '../report/report.component';

@Component({
    moduleId: module.id,
    selector: 'as-filter',
    templateUrl: 'filter.html'
})
export class FilterComponent  {
    private filtermodel: Filtermodel = new Filtermodel();
   

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        
    };

     private TypesOfFiltering = [
        { value: 'RegistrationDate', display: 'תאריך החלטה' },
        { value: 'LearningSrats', display: 'התחלת לימודים' },
        { value: 'LearningFinish', display: 'סיום לימודים' }
    ];
    
    
    
    constructor(public filterService: FilterService, public router: Router) {
       
    }

  
/*    filterFunc(filterMod){
            filterMod.FilteringField
    }*/
} 
