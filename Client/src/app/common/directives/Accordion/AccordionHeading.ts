import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'accordion-heading',
    template: `
              <!-- <a [href]="inputProp" target="_self"> -->
         
                <ng-content></ng-content>
               
             `
})
export class AccordionHeading {
@Input()
    inputProp: string;

   // constructor(private _router: Router) { }
}
