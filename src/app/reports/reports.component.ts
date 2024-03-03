import { Component } from '@angular/core';
import { ReportsService } from '../reports.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PanelService } from '../panel.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  reportSite: any;
  reports: any;

  constructor(private reportService:ReportsService, private snackbar:MatSnackBar, private router:Router, private panelService:PanelService){}
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
  }
  getReports(reportele:any){
    this.reportSite = reportele.value;
    this.reportService.getReport(reportele.value).subscribe((res:any)=>{
      this.reports = res.reports;
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
    
}
