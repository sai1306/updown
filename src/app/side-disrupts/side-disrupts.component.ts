import { Component, OnInit } from '@angular/core';
import { DisruptsService } from '../disrupts.service';
import { Disrupts } from '../disrupts';
@Component({
  selector: 'app-side-disrupts',
  templateUrl: './side-disrupts.component.html',
  styleUrls: ['./side-disrupts.component.css']
})
export class SideDisruptsComponent {
  disrupts: any;
  d: Disrupts[] = [];
  disruptsNow: any[] = [];
  constructor(private disruptService: DisruptsService) {}
  ngOnInit() {
    this.disruptService.getRecentDisrupts().subscribe((res: any) => {
      this.disrupts = res;
      for (let key in this.disrupts) {
        if(this.getTimeGapInHours(this.disrupts[key].date))
        {
          this.disruptsNow.push(this.disrupts[key]);
        }
      }      
    });
  }

  getTimeGapInHours(targetDate: string) {
    let prevtime: Number = Number(targetDate.slice(4, 7));
    const currentTime = new Date();
    let crt = String(currentTime);
    let time: Number = Number(crt.slice(8, 10));
    return prevtime === time;
  }
}
