import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogPosition } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { any } from 'prop-types';
import { MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog:MatDialog) { }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '80%',
    dialogConfig.maxWidth= '600px',
    dialogConfig.minWidth= '280px'
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any) => {
    });
}
}