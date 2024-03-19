import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl:String = 'https://test-check.glitch.me/user';
  constructor(private http:HttpClient) { }
  addComment(url:String, comment:String, user:String){
    const head = new HttpHeaders({"Content-Type": "application/json"});
    let obj = {url:url, comment:comment, user:user};
    let comm:String = comment
    return this.http.post(this.apiUrl+"/add-comment", {url:url, comment:comm, user:user}, {headers:head});
  }
  getComments(site:string){
    const params = new HttpParams().append('url',site);
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.get(this.apiUrl+"/get-comments",{params:params});
  }
  deleteComment(url:String, _id:String){
    const auth_token:any = sessionStorage.getItem('auth');
    const head = new HttpHeaders({"Content-Type": "application/json", "authtoken":auth_token});
    return this.http.post(this.apiUrl+"/delete-comment", {url:url, commentId:_id}, {headers:head});
  }
  upvoteComment(url:String, _id:String){
    const head = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post(this.apiUrl+"/upvote-comment", {url:url, commentId:_id}, {headers:head});
  }
}
