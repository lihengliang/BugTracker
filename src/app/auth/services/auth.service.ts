import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { DecodedToken } from '../models/token.model';
import { JwtUserProfileService } from './jwt-user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private token: string = null;

  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private jwtUserProfileService: JwtUserProfileService,
    private zone: NgZone
  ) {}

  setSession(token: string): void {
    localStorage.setItem('access_token', token);
    this.setUser();
    this.router.navigate(['/']);
  }

  setUser(): void {
    const decodedTokenData = this.getDecodedAccessToken();
    console.log(decodedTokenData);
    this.jwtUserProfileService.profile.next(decodedTokenData.data);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.jwtUserProfileService.profile.next({ firstName: '', LastName: '', email: '', role: null });
    this.router.navigate(['/logout']);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getDecodedAccessToken(): DecodedToken {
    try {
      return this.jwtHelperService.decodeToken(this.getAccessToken());
    } catch (Error) {
      this.logout();
      throw Error;
    }
  }

  getUserRoles(): Array<string> {
    let userRoles: Array<string>;
    this.jwtUserProfileService.profile.subscribe(
      res => {
        if (res && !this.isAccessTokenExpired) {
          userRoles = res.role;
        } else {
          userRoles = null;
        }
      }
    );
    if (userRoles === null) {
      this.logout();
      this.zone.run(() => this.router.navigate(['/login']));
      return [];
    }
    return userRoles;
  }

  isValidRole(validRoles: Array<string>): boolean {
    const userRoles = this.getUserRoles();
    for (const role of userRoles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): boolean {
    console.log(this.getAccessToken());
    if (this.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  }

  isAccessTokenExpired(): boolean {
    return this.jwtHelperService.isTokenExpired(this.getAccessToken());
  }
}
