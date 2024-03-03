import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(private router:Router) { }
  navigate(val:String){
  console.log(val);
  
  if(val === 'Reports')
  this.router.navigate(['/admin/panel/reports'])
  else if(val === 'Comments'){
    this.router.navigate(['/admin/panel/comments'])

  }
  else if(val === 'Add admin'){
    this.router.navigate(['/admin/panel/add-admin'])

  }
  else if(val === 'Update options'){
    this.router.navigate(['/admin/panel/options'])
  }
  else if(val === 'Add bulk Urls'){
    this.router.navigate(['/admin/panel/add-urls']);
  }
}
}
