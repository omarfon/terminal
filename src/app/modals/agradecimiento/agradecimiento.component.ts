import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrls: ['./agradecimiento.component.scss']
})
export class AgradecimientoComponent implements OnInit {

  constructor(public router: Router, public matDialog: MatDialogRef<AgradecimientoComponent>) { }

  ngOnInit() {
  }
  goToHome(){
    this.router.navigate(['/home']);
    this.matDialog.close();
  }
}
