import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { CommentsService } from '../comments.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments: any;
  site:any;
  constructor(private snackbar:MatSnackBar, private commentService:CommentsService, private panelService:PanelService){}
  navigate(ele:HTMLAnchorElement) {
    console.log(ele.innerText);
    let val = ele.innerText;
    this.panelService.navigate(val);
  }
  getComments(commentele:any){
    this.commentService.getComments(commentele.value).subscribe((res:any)=>{
      this.comments = res[0].comments;
      this.site = commentele.value;
    }); 
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
}
