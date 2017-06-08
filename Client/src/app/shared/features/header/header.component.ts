import { Component, OnInit, HostListener } from '@angular/core';
import { Response,Http } from '@angular/http';
import { User } from 'common/Models/user';
import { Router } from '@angular/router';
import { AuthService } from 'common/services/auth/auth.service';
import { HttpService } from 'common/services/http.service';
import { ValidationService } from 'common/services/validation.service';

@Component({
  moduleId: module.id,
  selector: 'as-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  data = {};
  message: string;
  emailField: string = '';
  user: User = new User();
  done: boolean = false;
  isProperID = 0;
  isProperEmail = 0;
 // isGood = 0;


  constructor(public authService: AuthService, public router: Router,
    public httpService: HttpService, public validationService: ValidationService) {
  //  this.httpService.isGood = true;
  }

 
  

  register(user) {
    event.preventDefault();
    this.isProperID = this.validationService.validateUserId(user.UserId);
    this.isProperEmail = this.validationService.validateEmail(user.email);
    if (this.isProperEmail !== 0 && this.isProperID !== 0) {
      return;
    }
   
    this.httpService.register(user).subscribe(
      res=> {
     
        if(res.json().success){
     //     localStorage.setItem('fpState', JSON.stringify({ fp: 1 }) );
         //  localStorage.setItem('fpState', '1' );
            this.httpService.fpState = 1;
            localStorage.setItem('id_token', JSON.stringify({ token: res.json().token }));
            this.router.navigate(['/forgetpsw']);
        }
  
    //    this.httpService.isGood = 1;
    /*    console.log('good');
      this.router.navigate(['/forgetpsw']);*/
      },
      (err) => {
        console.log(err);

      });
    
   //  this.router.navigate(['/forgetpsw']);

  }

  goBack() {
    this.router.navigateByUrl('/login');
    this.httpService.isGood = 0 ;
    // this.user.UserId = '';
    // this.user.email = '';
  }

  logout() {
    this.authService.logout();
    this.httpService.isGood = 0 ;
    this.router.navigateByUrl('/login');
  }

  @HostListener('window:beforeunload')
  onWindowUnload() {
    if(!this.authService.rememberMe){
      this.authService.logout();
    }
  }
}
