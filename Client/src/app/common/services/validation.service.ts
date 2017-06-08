import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
    validateEmail(email) {
        if (email.length === 0) {
           return  1;
        } else if (!this.reg.test(email)) {
           return 2;
        } else{
            return 0;
        }
    }

    validateUserId(UId) {

        if (UId.length === 0) {
            return 1;
        } else if (UId.length !== 9) {
            return 2;
        } else{
            return 0;
        }
    }

    validationPassword(pass) {
        if (pass.length === 0) {
            return 1;
        } else{
            return 0;
        }
    }
    
    /*
    validateEmail(user) {
        for (let i in user) {
            //  console.log(i);
            if (user[i].length === 0) {
                return 1;
            } 
        }
    }
    */
}
