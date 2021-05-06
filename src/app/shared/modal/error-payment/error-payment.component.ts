import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error-payment',
  templateUrl: './error-payment.component.html',
  styleUrls: ['./error-payment.component.scss']
})
export class ErrorPaymentComponent implements OnInit {
  public buttonRegret: boolean = false;
  constructor(public dialogRed: MatDialogRef<ErrorPaymentComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log('data en error component', data);
    this.buttonRegret = data.button;
    }

  ngOnInit() {
  }
  onClickNo() {
    this.dialogRed.close('errorModal');
  }

  backReservas() {
    this.dialogRed.close('errorModal');
    this.router.navigate(['reservas/avivatele']);
  }


}
