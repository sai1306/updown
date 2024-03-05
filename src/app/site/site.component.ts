import { AfterViewInit, Component, ElementRef, NgModule, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WebsitesService } from '../websites.service';
import { CommentsService } from '../comments.service';
import { Axios } from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Info } from '../info';
import { Comments } from '../comments'; 
import { Whois } from '../whois';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { Reports } from '../reports';
import { DialogService } from '../dialog.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

typeSelected: string;
  ip: any;
user:any
  org:any;
  nameserver:[]=[];
  domainname:any;
  address:any;
  city:any;
  countr:any;
  country:string = '';
  reports:Reports[] = [];
  comments:Comments[] = [];
  ableDelete:boolean[]=[];
  site:string = "";
  updown:boolean = true;
  options:Object = {};
  desc:String = "Please wait while we check the status of your site...";
  present:boolean = false;
  retrieved:Object = {};
  whois:any;
  optionsVisible:boolean = true;
  feedback_options:[]=[];
  whoisValues:any;
  dates:any[]=[];
  labels:string[]=[];
  count:Number[]=[];
  siteName:any="your site";
  maxReps:number=0;
  maxReports:string='NA';
  disrupts:any[]=[];
  description:String = '';
  constructor(private cdr: ChangeDetectorRef,private spinner:NgxSpinnerService, private snackBar: MatSnackBar,private matdialog:MatDialog,private dialog:DialogService, private route:ActivatedRoute, private websiteService:WebsitesService, private commentService:CommentsService, private reportService:ReportsService){
    this.typeSelected = 'ball-fussion';
  }
  
  ngOnInit(): void {
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end'
      
      this.spinner.show();
    this.user=localStorage.getItem('verifyName')
    this.route.params.subscribe((params)=>{
      this.site = params['name'];
      if(this.site.indexOf('www.')<0)
      {
        if(this.site.startsWith('http://'))
        {
         this.site= this.site.slice(7, this.site.length);
        }
        else if(this.site.startsWith('https://'))
        {
          this.site = this.site.slice(8, this.site.length);
        }
        this.site = 'www.' + this.site;
      }
      this.websiteService.addWebsite(this.site).subscribe(
        (res:any)=>{        
        let obj:Object = res;
        let arr = Object.values(obj);
        let check = arr[0];
        if(check === 'Website already exists')
        {
            this.websiteService.getUrlInfo(this.site).subscribe((res:any)=>{
              this.spinner.hide();
              this.retrieved= res;
              this.siteName = res.name;
              this.disrupts = res.disrupts;
              this.comments = res.comments.reverse();
              this.description = res.description;
              this.comments.forEach((comment:any)=>{
                let username:String=comment.user+"";
                username=username.toLowerCase()
                if(username === localStorage.getItem('verifyName')?.toLocaleLowerCase())
                {
                  this.ableDelete.push(true);
                }
                else{
                  this.ableDelete.push(false);
                }

              })
              this.whois = res.whois;
              this.reports = res.reports.reverse();  
              this.org = this.whois.org;
              this.nameserver = this.whois.name_servers;
              this.domainname = this.whois.domain_name;
              this.countr =this.whois.country;
              this.whoisValues=Object.values(this.whois);
              this.dates=res.reports;
              this.feedback_options = res.feedback_options;
              this.createPieChart();
              this.createBargraph();
            });
        }
      },
      (error:any)=>{
        this.updown=false;
        this.siteName = this.site
        this.desc="Please enter a valid URL";
      });
      this.websiteService.getWebsiteStatus(this.site).subscribe((res:any)=>{
        setTimeout(() => {
        this.spinner.hide();
        }, 1000);
        this.updown=res.status;
        if(!this.updown)
        {
          if(!this.desc.startsWith('Please enter a valid URL'))
          this.desc = 'Yes, we are detecting problems with '+this.site;
        }
        else{
          this.desc = 'No, we are not detecting problems with '+this.site;
        } 
      });
    });
    }
    deleteComment(id: String, index:number) {
      this.comments.splice(index, 1);
      this.commentService.deleteComment(this.site, id).subscribe((res)=>{
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end';
      config.duration = 2000;
      this.snackBar.open('Comment deleted successfully', 'X',config);
      })
      this.comments = this.comments.filter((val)=>{
        return val._id!==id;
      });
    }
  createBargraph() {
      let labels:string[] = [];
      let createdAt:[] =[];
      let labelArray:string[]=[];
      for(let i =0;i<this.dates.length;i++)
      {
        let date:any = this.dates[i];
        labelArray.push(date.date);
        labelArray.forEach((report:string)=>{
          labels.push(report.split(' ')[1] + ' ' + report.split(' ')[2] + ' ' + report.split(' ')[3]);
        })
      }
      this.labels = [...new Set(labels)];
      labels.forEach((label:string) => {
          let counter = 0;
          labelArray.forEach((report:string) => {
            if(report.split(' ')[1] + ' ' + report.split(' ')[2] + ' ' + report.split(' ')[3]==label)
            counter++;
              });
          this.count.push(counter);
      });
      const lineChart = new Chart('graph', {
        type:'line',
        data:{
          labels: this.labels,
          datasets: [{
              label: 'Reports',
              data: this.count,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options:{
        animations: {
          tension: {
            duration: 1500,
            easing: 'easeInCubic',
            from: 1,
            to: 0,
            loop: true
          },
      }
      }
      });
  }
  
    submitComment($event:any,comment: any){      
      $event.preventDefault();
      let cmtvalue:any = comment.value;
      if(cmtvalue.length>0)
      {
      if(localStorage.getItem('verifyName') === null)
      {
        this.dialog.openDialog();
      this.matdialog.afterAllClosed.subscribe((res)=>{
        if(localStorage.getItem('verifyName')!==null)
        {
        let str:string = ""+localStorage.getItem('verifyName');
        this.addCommentTodb(comment, str);
        }
      })}
      else{
        this.addCommentTodb(comment, ""+localStorage.getItem('verifyName'))
      }
    }
    else{
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end';
      config.duration = 2400;
      this.snackBar.open('Empty comment is not added.', 'X',config);
    }
    }
    addCommentTodb(comment:any, username:string){
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end';
      this.snackBar.open('Adding Comment please wait...', 'X',config);
      let val:any = comment.value+"";
      comment.value = '';
      this.commentService.addComment(this.site, val, username).subscribe((res:any)=>{
      this.snackBar.dismiss();        
      this.comments= [res.comments,...this.comments];
      const config = new MatSnackBarConfig();
      config.verticalPosition='bottom'
      config.horizontalPosition= 'end';
      config.duration = 2000;
      this.snackBar.open('Comment added successfully', 'X',config);
      })
    }
    addReport(option:any) {
      this.optionsVisible = false;
      this.websiteService.getIp().subscribe((res:any)=>{
        this.ip=res.ip;  
        this.websiteService.addLocation(this.ip).subscribe((res1:any)=>{
          this.country = res1.country;
          this.reportService.addReport(this.site, option, this.country).subscribe((res2:any)=>{
          });
        })
      });      
    }
    countOptions(data:Comments[]) {
      
      let count:number[] = [];
      this.feedback_options.forEach((option) => {
          let countOption:number = 0;          
          this.reports.forEach((report) => {
              if (report.feedback == option) {
                countOption++;

                if(this.maxReps<countOption){
                  this.maxReps=countOption;
                  this.maxReports=option
                }
              }
          });
          count.push(countOption);
      });
      return count;
  }
  createPieChart(){
    
    const data = {
      labels: this.feedback_options,
      datasets: [{
          data: this.countOptions(this.comments),
          backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#95a5a6', '#1abc9c', '#f1c40f', '#e67e22'],
      }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
};
const myPieChart = new Chart('ctx', {
  type: 'pie',
  data: data,
  options: options
});
  }
}

