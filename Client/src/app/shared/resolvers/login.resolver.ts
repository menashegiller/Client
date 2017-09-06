import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,Router } from '@angular/router';
// import { ContactsService } from './contacts.service';
import { AuthService } from 'common/services/auth/auth.service';
import { ROLE } from 'common/Models/user';

@Injectable()
export class LoginResolve implements Resolve<any> {

  constructor(private router: Router, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // return this.authService.login(user).subscribe(
    //         () => {
    //             // this.authService.currentUser
    //         },
    //         (err) => {
    //             console.log('Error: ', err);
    //         });
    if(this.authService.rememberMe && this.authService.currentUser && this.authService.currentUser.isLoggedIn){
        this.router.navigate([this.resolveHomeRoute()]);
    }
  }

  resolveHomeRoute(){
       let curUser = this.authService.currentUser;
       let redirect = '/home';
       
       if(curUser.role == ROLE.SUPER_USER){
            redirect = '/employee';
       }
       
       if(curUser.role == ROLE.FUND_CHAIRMAN ){
            redirect = '/tableDecisions';
       }

       if(curUser.role > ROLE.FUND_CHAIRMAN && curUser.role < ROLE.STUDENT ) {
            redirect = '/filterReport';
       }
       return redirect;
  } 
}