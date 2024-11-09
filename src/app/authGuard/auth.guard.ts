import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentAccessToken = this.authenticationService.currentUserValue;
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    let expectedRole;
    if (currentAccessToken && expectedRoleArray.length) {
      // authorised so return true
      let i;
      for (i = 0; i < expectedRoleArray.length; i++) {
        if (expectedRoleArray[i] === currentAccessToken.role) {
          expectedRole = currentAccessToken.role;
        }
      }
      if (this.authenticationService.isAuthenticated() && currentAccessToken.role === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
      // return true;
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
