import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public dataDoctor;
  public urlBaseAlter
  constructor(public auth:AuthService, public dialogRef: MatDialogRef<PerfilComponent>,@Inject(MAT_DIALOG_DATA) public message: any,) { }

  ngOnInit() {
    this.urlBaseAlter = this.auth.urlBaseAlter;
    this.dataDoctor = this.message.infoDetails;
    
    if(this.message.page === 'aviva-cuida'){
      document.querySelectorAll('body')[0].classList.add('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
    }
    else if(this.message.page === 'aviva-cura'){
      document.querySelectorAll('body')[0].classList.add('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
    }else if (this.message.page === 'home'){
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.add('aviva-home', 'page-embarazo');
    }
  }

  onClickNo(){
    this.dialogRef.close();
  }

}
