import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl:String = 'https://test-check.glitch.me/user';
  private panelUrl = 'https://test-check.glitch.me/admin';
  constructor(private http:HttpClient) { }
  addReport(url:string, option:string, country:string){
    const head = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post(this.apiUrl+'/add-report', {url:url, feedback:option, country:country}, {headers: head});
  }
  getReport(url:string){
    const params = new HttpParams().set('url', url);
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.get(this.apiUrl+'/get-reports', {params:params, headers:head});
  }
  deleteReport(url:String, _id:String){
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.post(this.apiUrl+"/remove-report", {url:url, commentId:_id}, {headers:head});
  }
  addOptions(options:any[], url:string){
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.post(this.panelUrl+'/update-buttons',{url, buttons:options}, {headers:head});
  }
}
  
