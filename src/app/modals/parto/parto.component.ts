import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parto',
  templateUrl: './parto.component.html',
  styleUrls: ['./parto.component.scss']
})
export class PartoComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              public router: Router,
              public dialogref: MatDialogRef<PartoComponent>) { }

  ngOnInit() {
  }

  openPageBeneficios(){
    this.dialogref.close();
    this.router.navigate(['beneficios']);
  }

}
