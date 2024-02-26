import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sortedsites } from '../sortedsites';
import { Sites } from '../sites';
import { WebsitesService } from '../websites.service';
import { DisruptsService } from '../disrupts.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  keyword:string = 'name';
  title = 'updown';
  searchWord : string='';
  websites = [];
  orderedWebsites:Sortedsites[] = [];
  retrievedWebsites:Sites[] = [];
  constructor( private snackBar: MatSnackBar,private router:Router,private websiteServices:WebsitesService, private disruptService:DisruptsService){
    const config = new MatSnackBarConfig();
    config.verticalPosition='bottom'
    config.horizontalPosition= 'end'
  
 snackBar.open('Loading please wait...', 'X',config);
    this.websiteServices.getAllSites().subscribe((res)=>{
      this.retrievedWebsites = res;
      this.sortSites();
      snackBar.dismiss();
    });
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {

  }

    selectEvent($event: any, item:any) {
     this.router.navigate(['search/', $event.url]);
    }
    onChangeSearch($event: any) {
      if($event.key === 'Enter')
      {
        this.router.navigate(['search/', $event.target.value]);
      }
      
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
  redirect(item:any) {
    this.router.navigate(['search/', item.url]);
  }
  searchRedirect(item: any) {
    this.router.navigate(['search/', item]);
    }
}
