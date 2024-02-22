import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../Models/iuser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: BehaviorSubject<boolean>
  constructor(private _HttpClient: HttpClient) {
    this.user = new BehaviorSubject<boolean>(this.isUserLogged);

  }
  get isUserLogged() {
    return localStorage.getItem('userToken') ? true : false;
  }

  register(user: Iuser): Observable<Iuser> {
    return this._HttpClient.post<Iuser>(`http://localhost:3000/users`, user);
  }
  login(user: any): Observable<any> {
    let backendToken:string=user.email
   localStorage.setItem('userToken',backendToken)
   this.user.next(true)
    return this._HttpClient.post(`http://localhost:3000/login`, user);
  }
  getUserState():Observable<boolean>{
    return this.user.asObservable()
   }
   logout(){
    localStorage.removeItem('userToken');
    this.user.next(false)

   }
}
