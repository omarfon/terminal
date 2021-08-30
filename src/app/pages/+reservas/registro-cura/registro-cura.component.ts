import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { DataPacienteService } from 'src/app/services/data-paciente.service';
import { fadeIn } from 'src/app/shared/animations/animation';
import { RegisterModalComponent } from 'src/app/shared/register-modal/register-modal.component';
import { ReservasService } from '../reservas.service';
import { CreateNoauthService } from './../../../services/create-noauth.service';
import { DependensService } from 'src/app/services/dependens.service';

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
  public dataResult;
   // NAME
   public name: string = '';
   public nameReadyValidate: boolean = false;
   public nameValidate: boolean;
 
   // LAST NAME
   public lastName: string = '';
   public lastNameReadyValidate: boolean = false;
   public lastNameValidate: boolean;
 
   // LAST NAME
   public lastNameMaterno: string = '';
   public lastNameMaternoReadyValidate: boolean = false;
   public lastNameMaternoValidate: boolean;
 
   // SEXO
   public sexo: any = 'Sexo';
   public selectSexo: any;
   public sexoValidate: boolean = false;
   public sexoID;
   public sexoData;
   // TYPE DOCUMENT
  /*  public document: any = 'Tipo de documento';
   public selectdocument: any;
   public documentId;
   public tipeDocumentService;
   public hideBox: boolean = false;
  */
   // NUMBER DOCUMENT
   public documentNumber: any = '';
   public documentReadyValidate: boolean = false;
   public documentValidate: boolean;
 
   // BIRTHDAY
   public birthday: any = '';
   public birthdayReadyValidate: boolean = false;
   public birthdayValidate: boolean;
 
   // PHONE DOCUMENT
   public phoneNumber: any = '';
   public phoneReadyValidate: boolean = true;
   public phoneValidate: boolean;
 
   // EMAIL
   public email: string = '';
   public emailReadyValidate: boolean = false;
   public emailValidate: boolean;
 
   // PASSWORD
   public password = '';
   public passwordReadyValidate: boolean = false;
   public passwordValidate: boolean = false;
 
   // PASSWORD REPEAT
   public passwordRepeat: any = '';
   public passwordRepeatReadyValidate: any;
   public passwordRepeatValidate: boolean;
   public activeRepeat: boolean = false;
 
   public mayor: boolean = false;
   public mayus: boolean = false;
   public isNum: boolean = false
   public checked: any;
   public activateDocumentNumber = true;
 
   // VAR OF STATE
   public loaderSession: boolean = false;
 
   // ID CODE
   public idCode: any;
   color;
   public activate = false;
   public busqueda = false;

   serviceError;
   public mailInvalid: boolean = false;
   public dniInvalid: boolean = false;
 
   public mode: string = 'indeterminate'
   // EXPRESIONS REGULAR
   public ER_NUM = /^([0-9])*$/;
   public ER_ONLY_NUM: any = /[0-9]/;
   public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
   public ER_STR_MA: any = /[A-Z]/;
   public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
   public datDni;

  constructor(private reservasService : ReservasService, 
              public dialog: MatDialog,
              public router: Router,
              public createNoAuthoSrv: CreateNoauthService,
              public dataXhisSrv: DataPacienteService,
              public dependentSrv: DependensService) { }

  ngOnInit() {
   /*  this.dateCita = this.reservasService.dateCita; */
    this.reservasService._progressPage.next(this.progressPage);
  }

  // OPEN MODAL LOGIN
  openLogin(): void{
    const diallogRef = this.dialog.open(ModalComponent, {
      data: 'aviva-cura'
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log('cerrando login');
      this.router.navigate(['/seguro-cura']);

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
  
  onkeyValidateString(data: any): void {
    if (this.nameReadyValidate && data === this.name) {
      if (data === this.name) {
        this.blurValidateString(data);
      }
    }

    else if (this.lastNameReadyValidate && data === this.lastName) {
      if (data === this.lastName) {
        this.blurValidateString(data);
      }
    }

    else if (this.lastNameMaternoReadyValidate && data === this.lastNameMaterno) {
      if (data === this.lastNameMaterno) {
        this.blurValidateString(data);
      }
    }

   /*  else if (this.documentReadyValidate && data === this.documentNumber) {
      if (data === this.documentNumber) {
        this.blurValidateString(data);
      }
    } */

    else if (this.phoneReadyValidate && data === this.phoneNumber) {
      if (data === this.phoneNumber) {
        this.blurValidateString(data);
      }
    }
    else if (this.emailReadyValidate && data === this.email) {
      if (data === this.email) {
        this.blurValidateString(data);
      }
    }
  }

  validateMayus() {
    if (this.validateInput(this.ER_STR_MA, this.password)) {
      this.mayus = true;

    } else {
      this.mayus = false;
    }
  }

  validateLen() {
    if (this.password.length >= 8) {
      this.mayor = true;
    } else {
      this.mayor = false;
    }
  }

   // VALIDATE INPUTS EXPRESIONES REGULARES
   validateInput(expresion: any, input: string): boolean {
    if (expresion.test(input)) {
      return true;
    } else {
      return false;
    }
  }

  blurValidateString(data: any): void {

    if (data === this.name) {
      this.nameReadyValidate = true;
      if (this.validateInput(this.ER_STR, data)) {
        this.nameValidate = true;
      } else {
        this.nameValidate = false;
      }
    }

    else if (data === this.lastName) {
      this.lastNameReadyValidate = true;
      if (this.validateInput(this.ER_STR, data)) {
        this.lastNameValidate = true;
      } else {
        this.lastNameValidate = false;
      }
    }

    else if (data === this.lastNameMaterno) {
      this.lastNameMaternoReadyValidate = true;
      if (this.validateInput(this.ER_STR, data)) {
        this.lastNameMaternoValidate = true;
      } else {
        this.lastNameMaternoValidate = false;
      }
    }

    else if (data === this.documentNumber) {
      this.documentReadyValidate = true;
      if (this.validateInput(this.ER_NUM, data)) {
        this.documentValidate = true;
      } else {
        this.documentValidate = false;
      }
    }

    else if (data === this.phoneNumber) {
      this.phoneReadyValidate = true;
      if (this.validateInput(this.ER_NUM, data) && data.length > 8) {
        this.phoneValidate = true;
      } else {
        this.phoneValidate = false;
      }
    }

    else if (data === this.email) {
      this.emailReadyValidate = true;
      if (this.validateInput(this.ER_EMA, data)) {
        this.emailValidate = true;
      } else {
        this.emailValidate = false;
      }
    }
  }

  getDataDni(){
    this.dataXhisSrv.getDataXhis(1, this.documentNumber).subscribe(data => {
      this.dataResult = data;
      this.dependentSrv.patientId = data[0].patientId;
      console.log(this.dataResult);
      this.router.navigate(['seguro-cura']);
    }, err =>{
      console.log(err)
    })
  }

  createNoAuth(){
    const patientId = this.dataResult[0].patientId;
    this.createNoAuthoSrv.createAppoitmentNoAutho(patientId).subscribe(data => {
      console.log('envío a modal o creación');
    })
  }

  validateDni(){
    const patientId = this.dataResult[0].patientId;
    this.dataXhisSrv.getTypesDocument(patientId).subscribe(data => {
        console.log('mostrar contenido', data);
    })
  }


}
