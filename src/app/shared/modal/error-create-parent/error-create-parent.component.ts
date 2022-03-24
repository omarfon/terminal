import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-create-parent',
  templateUrl: './error-create-parent.component.html',
  styleUrls: ['./error-create-parent.component.scss']
})
export class ErrorCreateParentComponent implements OnInit {
  public name;
  constructor(public dialogRef:MatDialogRef<ErrorCreateParentComponent>, public router: Router) { }

  ngOnInit() {
    const name = localStorage.getItem('session');
    const nombre = JSON.parse(name);
    if(nombre.name){
      this.name = nombre.name;
    }else{
      this.name = nombre.nombre;
    }
  }

  closeButton(){
    this.dialogRef.close();
    this.router.navigate(['home']);
  }

}
