import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IEmployee } from '../register/testmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  private _url : string ="C://DatingApplication//DatingApp-SPA//src//app//register//data.json";


constructor(private http: HttpClient) { }
debugger;
login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
    const user = response;
    if (user) {
     localStorage.setItem('token', user.token);
     this.decodedToken = this.jwtHelper.decodeToken(user.token);
     console.log(this.decodedToken);
    }
  })
  );
 }

  register(model: any){
   return this.http.post(this.baseUrl + 'register', model);
  }

getdata(): Observable<IEmployee[]>
{
 return this.http.get<IEmployee[]>(this._url);
}


  loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);

  }

//  getdata(){
//return [
 // {"id":1,"Name":"Test1"},
 // {"id":2,"Name":"Test2"}
//];
 // }


}
