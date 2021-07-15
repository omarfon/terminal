import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { fadeIn } from 'src/app/shared/animations/animation';
import { RegisterModalComponent } from 'src/app/shared/register-modal/register-modal.component';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-registro-cura',
  templateUrl: './registro-cura.component.html',
  styleUrls: ['./registro-cura.component.scss'],
  animations: [fadeIn]
})
export class RegistroCuraComponent implements OnInit {
  progressPage = {
    page : 'avivaCura',
    state :  'registro',
    pageDoctor : true
  }

  dateCita;
  constructor(private reservasService : ReservasService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dateCita = this.reservasService.dateCita;
    this.reservasService._progressPage.next(this.progressPage);
  }

  // OPEN MODAL LOGIN
  openLogin(): void{
    const diallogRef = this.dialog.open(ModalComponent, {
      data: 'aviva-cura'
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  // OPEN MODAL REGISTER

  openRegister(): void{
    const diallogRef = this.dialog.open(RegisterModalComponent, {
      data: 'aviva-cura',
      panelClass: ['aviva-cura-fondo'] 
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  backLink(){
    window.history.back();
  }


}
