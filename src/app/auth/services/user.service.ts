import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postRegister(user: RegisterUser): Observable<any> {
    return this.http.post(environment.apiUrl + '/register', user);
  }

  postLogin(user: RegisterUser): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', user);
  }
}
