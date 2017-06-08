import { Injectable } from '@angular/core';

@Injectable()
export class HelpService {

    toggleShow(el) {
           el.show = !el.show;
          
            if (el.show) {
                el.hideState = false;
                el.pwdelement.changeType('text');
            } else {
                el.hideState = true;
                el.pwdelement.changeType('password');
            }
        }
}
