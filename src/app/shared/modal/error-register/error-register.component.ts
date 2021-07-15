import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-register',
  templateUrl: './error-register.component.html',
  styleUrls: ['./error-register.component.scss']
})
export class ErrorRegisterComponent implements OnInit {
  public message;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ErrorRegisterComponent>) {
    console.log(data);
    this.message = data.error.message; 
   }

  ngOnInit() {
  }

  closeButton(){
    this.dialogRef.close();
  }

}
