import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private apiUrl = 'https://test-check.glitch.me/admin'
  constructor(private router:Router, private http:HttpClient) { }
  navigate(val:String){  
  if(val === 'Reports')
  this.router.navigate(['/admin/panel/reports'])
  else if(val === 'Comments'){
    this.router.navigate(['/admin/panel/comments'])

  }
  else if(val === 'Add admin'){
    this.router.navigate(['/admin/panel/add-admin'])

  }
  else if(val === 'Update options'){
    this.router.navigate(['/admin/panel/options'])
  }
  else if(val === 'Add bulk Urls'){
    this.router.navigate(['/admin/panel/add-urls']);
  }
  else if(val === 'Description'){
    this.router.navigate(['admin/panel/description'])
  }
}
addDescription(url:string, description:string){
  const auth_token:string = "" + sessionStorage.getItem('auth');
  const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
  return this.http.post(this.apiUrl+'/set-description', {url, description} , {headers:head} )
}
}
