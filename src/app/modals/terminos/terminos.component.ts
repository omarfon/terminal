import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<TerminosComponent>) { }

  ngOnInit() {
  }

    onClickNo() {
      this.dialogref.close();
    }


}
