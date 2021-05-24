import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    boolean {
    const validRoles: string[] = route.data.validRoles;
    const token = this.authService.getAccessToken();
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    const roles = this.authService.getDecodedAccessToken().data.role;
    if (roles) {
      for (const role in roles) {
        if (validRoles.includes(role)) {
          return true;
        }
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
