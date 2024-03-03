import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { ReportsComponent } from './reports/reports.component';
import { CommentsComponent } from './comments/comments.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { OptionsComponent } from './options/options.component';
import { AdminSitesComponent } from './admin-sites/admin-sites.component';

const routes: Routes = [
    { path: 'search/:name', component: SiteComponent,},
     {path: '', component: IndexComponent},
     {path:'admin/login', component:LoginComponent},
     {
      path:'admin/panel/add-urls', component:PanelComponent
     },{
      path:'admin/panel/reports', component:ReportsComponent
     },{
      path:'admin/panel/comments', component:CommentsComponent
     },
     {
      path:'admin/panel/add-admin', component:AddAdminComponent
     },
     {
      path:'admin/panel/sites', component:AdminSitesComponent
     },
     {
      path:'admin/panel/options', component:OptionsComponent
     }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
