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

import { ROLE } from 'common/Models/user';

@Injectable()
export class SuperUserGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url) && this.isSuperUser(this.authService.currentUser, url);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.currentUser.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

private isSuperUser(user:any, url: string): boolean {
    if (user.role < ROLE.STUDENT) 
    { 

        return true; 
    } else {
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
  }


 


}
