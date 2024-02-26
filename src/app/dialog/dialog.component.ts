import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { CaptchaJs } from '@solarwinter/captchajs';
import { CaptchaJsOptions } from '@solarwinter/captchajs';
import { DialogService } from '../dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  captcha:String = 'abcd';
  flag:Boolean = false;
  public aFormGroup:any;

  captchaJs:any;
  captchaOptions:CaptchaJsOptions ={
    client: '',
    secret: ''
  };
  @ViewChild('captchatemp') captchatemp:ElementRef | undefined;
onSubmit() {
  this.dialog.closeAll();
  localStorage.setItem('verifyName', this.captchatemp?.nativeElement.value)
}
  
  constructor(private dialog:MatDialog,private dialogService:DialogService,private fb: FormBuilder) { }
  ngOnInit() {
    this.aFormGroup = this.fb.group({
      recaptcha: ['', Validators.required]
    });
    // this.captchaJs = new CaptchaJs(this.captchaOptions);
  }
  handleSuccess(e:any) {
    this.flag=true;
  }
  cancel() {
    this.dialog.closeAll();
  }

}
 

