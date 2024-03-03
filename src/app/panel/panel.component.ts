import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ReportsService } from '../reports.service';
import { CommentsService } from '../comments.service';
import { WebsitesService } from '../websites.service';
import { Sortedsites } from '../sortedsites';
import { Sites } from '../sites';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PanelService } from '../panel.service';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent  implements OnInit {


comments: any;
site:any;
reports: any;
reportSite: any;
orderedWebsites: Sortedsites[]=[];
  retrievedWebsites: Sites[]=[];

  


name: any;
email: any;
password: any;
constructor(private snackbar:MatSnackBar, private panelService:PanelService, private websiteService:WebsitesService,private commentService:CommentsService,private loginService:LoginService, private reportService:ReportsService, private router:Router){

  if(!sessionStorage.getItem('auth'))
  {
    router.navigate(['admin/login']);
  }
  
}
  ngOnInit(): void {
    this.websiteService.getAllSites().subscribe((res:any)=>{
      this.retrievedWebsites = res;
      this.sortSites();
    })
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
getReports(reportele:any){
  this.reportSite = reportele.value;
  this.reportService.getReport(reportele.value).subscribe((res:any)=>{
    this.reports = res.reports;
  }); 
}
getComments(commentele:any){
  this.commentService.getComments(commentele.value).subscribe((res:any)=>{
    this.comments = res[0].comments;
    this.site = commentele.value;
  }); 
}
addBulkUrls(text: any) {
  const config = new MatSnackBarConfig();
  config.verticalPosition='bottom'
  config.horizontalPosition= 'end'
 this.snackbar.open("Adding wait...", 'X',config);
  let arr:string[]=[];
  arr = text.value.split(',');
  console.log(arr);
  
  this.websiteService.addBulkUrls(arr).subscribe((res:any)=>{
    const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.duration = 2500;
      config.horizontalPosition= 'end'
   this.snackbar.open(res.message +", refresh to see changes in dashboard", 'X',config);
  },
  );
  }
  deleteComment(id: any,index: number) {
    this.commentService.deleteComment(this.site, id).subscribe((res:any)=>{
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end'
    
   this.snackbar.open(res.message, 'X',config);
    })
    this.comments = this.comments.filter((val:any)=>{
      return val._id!==id;
    });
   }
   deleteReport(id: any, index: number) {
    this.reportService.deleteReport(this.reportSite, id).subscribe((res:any)=>{
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end'
   this.snackbar.open(res.message, 'X',config);
    })
    this.reports = this.reports.filter((val:any)=>{
      return val._id!==id;
    });
    }
    sortSites(){
      for(let i =65;i<=90;i++){
        this.orderedWebsites.push({char:String.fromCharCode(i), values:[]});
      }
      this.retrievedWebsites.forEach((website:any)=>{
        
        let char = 'A';      
        let index = website.name.toUpperCase().charCodeAt(0)-char.charCodeAt(0);
        this.orderedWebsites[index].values.push(website);
      })
      this.orderedWebsites = this.orderedWebsites.filter((website:any)=>{
        return website.values.length !== 0;
      })
      
}
deleteUrl(id:String) {
  const config = new MatSnackBarConfig();
   config.verticalPosition='bottom'
   config.horizontalPosition= 'end'
  this.snackbar.open("Deleting wait...", 'X',config);
  this.orderedWebsites.forEach((website:any)=>{
    website.values = website.values.filter((val:any)=>{
      return val._id!==id;
    });
  });
   this.websiteService.deleteUrl(id).subscribe((res:any)=>{
   this.snackbar.open(res.message, 'X',config);
   })
}
addOptions(text:any, url:any){
  let arr:string[]=[];
  arr = text.value.split(',');
  this.reportService.addOptions(arr, url.value).subscribe((res:any)=>{
    const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.duration = 2500;
      config.horizontalPosition= 'end'
      this.snackbar.open(res.message, 'X',config);
  },
  (err:any)=>{
    const config = new MatSnackBarConfig();
    config.verticalPosition='bottom'
    config.duration = 2500;
    config.horizontalPosition= 'end'
    this.snackbar.open(err.message, 'X',config);
  }
  );
  
}
navigate(ele:HTMLAnchorElement) {
  console.log(ele.innerText);
  let val = ele.innerText;
  this.panelService.navigate(val);
}
}
