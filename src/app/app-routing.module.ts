import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
    { path: 'search/:name', component: SiteComponent,},
     {path: '', component: IndexComponent},
     {path:'admin/login', component:LoginComponent},
     {
      path:'admin/panel', component:PanelComponent
     },
     {
      path:'**', redirectTo:''
     }
     

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
