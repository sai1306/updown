import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { Router } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  
name: any;
email: any;
password: any;
  constructor(private loginService:LoginService, private snackbar:MatSnackBar,  private panelService:PanelService, private router:Router){}
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
  }
  onRegSubmit() {
    this.loginService.createUser(this.name, this.email, this.password).subscribe((res:any)=>{
      if(res.status===401)
      {
        this.router.navigate(['admin/login']);
      }
      const config = new MatSnackBarConfig();
        config.verticalPosition='bottom'
        config.horizontalPosition= 'end'
        this.snackbar.open(res.message, 'X',config);
    },
    (err:any)=>{
      const config = new MatSnackBarConfig();
        config.verticalPosition='bottom'
        config.horizontalPosition= 'end'
        if(err.error.errors)
        this.snackbar.open(err.error.errors[0].msg, 'X',config);
      else
      this.snackbar.open(err.error.error, 'X',config);
    
    }
    );
  }
}
