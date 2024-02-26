import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: any;
password: any;
email: any;
constructor(private loginService:LoginService, private router:Router){}
onSubmit() {
  this.loginService.addUser(this.email, this.password).subscribe((res:any)=>{
    sessionStorage.setItem('auth', res.authToken);
    if(sessionStorage.getItem('auth'))
    {
      this.router.navigate(['admin/panel']);
    }
  })
}

}
