import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { ReportsService } from '../reports.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  constructor(private snackbar:MatSnackBar, private reportService:ReportsService, private panelService:PanelService){}
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
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
}
