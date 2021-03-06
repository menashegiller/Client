import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'common/services/auth/auth.service';
import { AngularFire } from 'angularfire2';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';



@Injectable()
export class StaffGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url) && this.isStaff(this.authService.currentUser, url);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.currentUser.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

private isStaff(user:any, url: string): boolean {
  /*   if (user.email === 'menashegiller@gmail.com') 
    { 
        return true; 
    } else { */
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
  //  }
  }


 


}
