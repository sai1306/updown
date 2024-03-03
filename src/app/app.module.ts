import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DisruptsComponent } from './disrupts/disrupts.component';
import { NavComponent } from './nav/nav.component';
import { SiteComponent } from './site/site.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { TitleCasePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CaptchaJs } from "@solarwinter/captchajs";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';

import { NgxCaptchaModule } from 'ngx-captcha';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { ReportsComponent } from './reports/reports.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SideDisruptsComponent } from './side-disrupts/side-disrupts.component';

@NgModule({
  declarations: [
    AppComponent,
    DisruptsComponent,
    NavComponent,
    SiteComponent,
    IndexComponent,
    DialogComponent,
    LoginComponent,
    PanelComponent,
    ReportsComponent,
    SideDisruptsComponent,
  ],
  imports: [
    ToastrModule,
    NgxSpinnerModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    AutocompleteLibModule, 
    HttpClientModule,
    AppRoutingModule, 
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}

)

export class AppModule { }
