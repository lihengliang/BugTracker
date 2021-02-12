import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DecodedToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class JwtUserProfileService {
  profileData: User = { firstName: '', LastName: '', email: '', role: null };

  profile: BehaviorSubject<User> = new BehaviorSubject<User>(this.profileData);
  constructor() { }
}
