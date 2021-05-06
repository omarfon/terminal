import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ginecopedia',
  templateUrl: './ginecopedia.component.html',
  styleUrls: ['./ginecopedia.component.scss']
})
export class GinecopediaComponent implements OnInit {

  constructor(public router: Router,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<GinecopediaComponent>) { }

  ngOnInit() {
  }

  openPagePediatria(){
    this.dialogRef.close();
    this.router.navigate(['pediatria']);
  }
}
