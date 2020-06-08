import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { IEmployee } from '../register/testmodel';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl =  environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;


  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();




  private _url : string ="C://DatingApplication//DatingApp-SPA//src//app//register//data.json";


constructor(private http: HttpClient) { }
debugger;
login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
    const user = response;
    if (user) {
     localStorage.setItem('token', user.token);
     localStorage.setItem('user', JSON.stringify(user.user));
     this.decodedToken = this.jwtHelper.decodeToken(user.token);
     this.currentUser = user.user;
     this.changeMemberPhoto(this.currentUser.photoUrl);
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

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }


}
