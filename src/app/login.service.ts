import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://test-check.glitch.me/admin/'
  constructor(private http:HttpClient) { }
  addUser(email:string, password:string)
  {
    const head = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post(this.apiUrl+'login', {email:email, password:password}, {headers:head});
  }
  createUser(name:string, email:string, password:string){
    const auth_token:any = sessionStorage.getItem('auth');
    const obj ={name:name,email:email, password:password}
    console.log(obj);
    const head = new HttpHeaders({"Content-Type": "application/json","authtoken":auth_token});
    return this.http.post(this.apiUrl+'create-user', {name:name,email:email, password:password}, {headers:head});
  }
}
