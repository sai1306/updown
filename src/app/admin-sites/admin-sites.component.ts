import { Component } from '@angular/core';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.css']
})
export class AdminSitesComponent {

  constructor(private panelService:PanelService){}
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
  }
}
