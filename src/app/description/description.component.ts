import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {

  url:string='';
  description:string='';
  constructor(private snackbar:MatSnackBar, private panelService:PanelService){}
  onSubmit(){
    console.log(this.url, ' ', this.description);
    if(this.url.length>0 && this.description.length>0)
    {
      this.panelService.addDescription(this.url, this.description).subscribe((res:any)=>{
        const config = new MatSnackBarConfig();
        config.verticalPosition='bottom'
        config.duration = 2500;
        config.horizontalPosition= 'end'
        this.snackbar.open(res.message, 'X',config);
      })
    }
  }
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
  }
}
