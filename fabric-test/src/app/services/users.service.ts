import { Injectable } from '@angular/core';
import { User } from '../Models/Users/User';
import { ResponseModel } from '../Models/ResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  Login(user: User): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      'http://localhost:3000/user/login',
      user
    );
  }
  SignUp(user: User): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      'http://localhost:3000/user/signup',
      user
    );
  }
}
