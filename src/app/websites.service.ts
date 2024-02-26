import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sortedsites } from './sortedsites';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {
  private apiUrl1:String = 'https://test-check.glitch.me/user';
  private apiUrl2:String = 'https://test-check.glitch.me/admin';
  orderedSites:Sortedsites[]=[];
  constructor(private http:HttpClient) { }  
  getAllSites(){
    return this.http.get<any>(this.apiUrl1+"/get-all-websites");
  }
  getWebsiteStatus(site:string){
    let newSite=site.startsWith("www.")?site.slice(4,site.length):site;
    newSite=site.lastIndexOf('.')==-1?newSite+'.com':newSite
    const params = new HttpParams().append('url',newSite);
    return this.http.get(this.apiUrl1+"/get-status", {params:params});
  } 
  getUrlInfo(site:string){
    const params = new HttpParams().append('url',site);
    return this.http.get(this.apiUrl1+"/url-info", {params:params});
  }
  addWebsite(url:string){
    const head = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post(this.apiUrl1+"/add-website", {url:url}, {headers:head});
  }
  getIp(){
    return this.http.get('https://api64.ipify.org/?format=json');
  }
  addLocation(ip:any) {    
    const head = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post(this.apiUrl1+'/get-country', {ip:ip}, {headers:head});
  }
  addBulkUrls(arr:string[]){
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.post(this.apiUrl2+"/add-multiple-urls", {urls:arr}, {headers:head});
  }
  deleteUrl(id:String){
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.post(this.apiUrl2+'/delete-website', {id:id}, {headers:head});
  }
}
