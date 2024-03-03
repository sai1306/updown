import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: any;
password: any;
email: any;

constructor(private loginService:LoginService, private router:Router,private snackbar:MatSnackBar){

}
onSubmit() {
  const config = new MatSnackBarConfig();
  config.verticalPosition='bottom'
config.horizontalPosition= 'end'
  this.snackbar.open('Logging in, Please wait...','X',config);
  this.loginService.addUser(this.email, this.password).subscribe((res:any)=>{
    sessionStorage.setItem('auth', res.authToken);
    if(sessionStorage.getItem('auth'))
    {
      this.router.navigate(['admin/panel']);
    }
  })
}

}
