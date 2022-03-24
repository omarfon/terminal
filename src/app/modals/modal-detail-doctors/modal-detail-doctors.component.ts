import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detail-doctors',
  templateUrl: './modal-detail-doctors.component.html',
  styleUrls: ['./modal-detail-doctors.component.scss']
})
export class ModalDetailDoctorsComponent implements OnInit {
  public dataDoctor;
  public urlBaseAlter
  constructor(public dialogRed: MatDialogRef <ModalDetailDoctorsComponent>, @Inject(MAT_DIALOG_DATA) public message: any,) { }

  ngOnInit() {
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
    this.dialogRed.close();
  }

}
