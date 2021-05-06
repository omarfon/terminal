import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { RegisterModalComponent } from 'src/app/shared/register-modal/register-modal.component';
import { fadeIn } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.scss'],
  animations: [fadeIn]
})
export class RegistroCitaComponent implements OnInit {
  
  progressPage = {
    page : 'avivaCuida',
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
      data: 'aviva-cuida'
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  // OPEN MODAL REGISTER

  openRegister(): void{
    const diallogRef = this.dialog.open(RegisterModalComponent, {
      data: 'aviva-cuida',
      panelClass: ['aviva-cuida-fondo'] 
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  backLink(){
    window.history.back();
  }

}

