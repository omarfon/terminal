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
import * as moment from 'moment';
import { GetDataUserService } from 'src/app/services/get-data-user.service';
import { AuthService } from './../../../shared/auth/auth.service';
import { RegisterService } from './../../../shared/auth/+register/register.service';
import { TerminosComponent } from './../../../modals/terminos/terminos.component';

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

  public dataUser: any;
  public dataReniec: any;

  dateCita;
  public dataResult;
   // NAME
   public name: string = '';
   public nameReadyValidate: boolean = false;
   public nameValidate: boolean;

   //VALIDATE DNI
   public valdni: string = '';
   public valdniReadyValidate: boolean = false;
   public valdniValidate: boolean = false;
 
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
   public passwordValidate: boolean = true;
 
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
   public tipeDocumentService;
 
   public mode: string = 'indeterminate'
   // EXPRESIONS REGULAR
   public ER_NUM = /^([0-9])*$/;
   public ER_ONLY_NUM: any = /[0-9]/;
   public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
   public ER_STR_MA: any = /[A-Z]/;
   public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
   public datDni;
  numDoc: any;
  dni: any;
  public documentInvalid = false;
  public preloader: boolean = false;
  public jsonCita;
  

  constructor(private reservasService : ReservasService, 
              public dialog: MatDialog,
              public router: Router,
              public createNoAuthoSrv: CreateNoauthService,
              public dataXhisSrv: DataPacienteService,
              public gdus: GetDataUserService,
              public dependentSrv: DependensService,
              public authSrv: AuthService,
              public registerService: RegisterService) { }

  ngOnInit() {
   this.dateCita = this.reservasService.dateCita; 
   console.log(this.dateCita);
   this.jsonCita = JSON.parse(this.createNoAuthoSrv.dataJson);
    console.log(this.jsonCita);
    this.reservasService._progressPage.next(this.progressPage);
    this.authSrv.getSesionPublic();
     if(localStorage.getItem('session')){
       this.registerService.userGenders().subscribe(data => {
         this.sexoData = data;
         this.reservasService.sexoData = data;
         console.log(this.sexoData)
       }, error => {
     });
   
     this.registerService.userDocuments().subscribe(data => {
         this.tipeDocumentService = data;
         this.reservasService.tipeDocumentService = data;
       },error => {
         console.log(error)
       })
     }
     this.registerService.userRelations().subscribe(data => {
        this.reservasService.relationsService = data
     })
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

    //SELECT GENDER
    selecGender(event:any) {
      this.selectSexo = event.target.selectedOptions[0].textContent;
      this.sexoID = event.target.value;
      if (this.sexo != this.selectSexo) {
        this.sexoValidate = true;
      } else {
        this.sexoValidate = false;
      }
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

  validateBirthdate() {
    const h = '/'
    if (this.birthday.length === 2) {
      this.birthday = this.birthday + h;
    } else if (this.birthday.length === 5) {

      this.birthday = this.birthday + h;
    } else if (this.birthday.length > 5) {

    }
    if (this.birthdayReadyValidate === true) {

      this.validateB();
    }
  }

  // VALIDATE BIRTHDATE
  validateB() {

    let date = moment(this.birthday, 'DD-MM-YYYY').isValid();
    if (this.birthday.length === 10) {
      if (date) {
        this.birthdayValidate = true;
        this.birthdayReadyValidate = true;
      } else {
        this.birthdayValidate = false;
        this.birthdayReadyValidate = true;
      }
    } else {
      this.birthdayValidate = false;
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
    this.preloader = true;
    this.dataXhisSrv.getDataXhis(1, this.documentNumber).subscribe(data => {
      this.dataResult = data;
      if(this.dataResult){
        this.name = this.dataResult[0].nombres;
        this.lastName = this.dataResult[0].apellido1;
        this.lastNameMaterno = this.dataResult[0].apellido2;
        this.lastNameMaterno = this.dataResult[0].apellido2;
        this.sexo = this.dataResult[0].desSex;
        this.email = this.dataResult[0].email;
        this.phoneNumber = this.dataResult[0].telefono;
        this.numDoc = this.dataResult[0].numDoc;
        this.birthday = moment(this.dataResult[0].fecNac).format('d/MM/yyyy');
      }
      this.reservasService.patientId = data[0].patientId;
      this.createNoAuthoSrv.getDataPatient(data[0].patientId).subscribe(data =>{
        const session = data;
        console.log('session en getDataDni', JSON.stringify(session));
        localStorage.setItem('session', JSON.stringify(session));
      })
      this.reservasService.dataPaciente = data;
      console.log(this.dataResult);
      this.router.navigate(['seguro-cura']);
      this.preloader = false;
    }, err =>{
      console.log(err);
      this.searchDniReniec();
    })
  }

  searchDniReniec(){
    this.gdus.getPublicKey(this.documentNumber).subscribe((data:any) => {
      if(data.success == false){
        this.preloader = false;
        this.dniInvalid = true;
      }else{
        this.dataReniec = data.data;
        this.reservasService.dataPacienteReniec = this.dataReniec;
        console.log(this.dataReniec);
        this.name = this.dataReniec.nombres;
          this.lastName = this.dataReniec.apellido_paterno;
          this.lastNameMaterno = this.dataReniec.apellido_materno;
         /*  this.sexo = this.dataUser[0].desSex;
          this.email = this.dataUser[0].email;
          this.phoneNumber = this.dataUser[0].telefono; 
          this.numDoc = this.dni; */
          this.preloader = false;
          this.activate = true;
        console.log(this.dataReniec);
      }
  }, err => {
    this.dniInvalid = true;
    this.preloader = false;
    console.log(err)
  })
  }

  validateAllInputs(): boolean {
    if (this.documentValidate && this.birthdayValidate && this.phoneValidate && this.emailValidate && this.checked && this.passwordValidate && this.sexoValidate) {
      return false;
    } else {
      return true;
    }
  }

  createNoAuth(){
    const patientId = this.dataResult[0].patientId;
    this.createNoAuthoSrv.createAppoitmentNoAutho(patientId).subscribe(data => {
      console.log('envío a modal o creación');
    })
  }

  validatePass() {
    this.validateLen();
    if (this.mayor) {
      this.passwordValidate = true;
      this.activeRepeat = false; 
    } else {
      this.passwordValidate = false;
      this.activeRepeat = true;
    }
}

  validateDni(){
    const patientId = this.dataResult[0].patientId;
    this.dataXhisSrv.getTypesDocument(patientId).subscribe(data => {
        console.log('mostrar contenido', data);
    })
  }

  onValidateDni(event){
    console.log(event);
  }

  sendData(){
    if(this.dataUser){
      console.log('enviarData', this.dataUser);
    }else{
      console.log('')
    }
  }

  //GET CODE
  getCode(email: any) {
    this.loaderSession = true;
    this.registerService.sendCodeNew(this.email, this.documentNumber)
      .subscribe((data: any) => {
        if (data.result === 'ok') {
          const newFecha = this.birthday.split('/');
          const newFechaFormat: string = newFecha[2] + '-' + newFecha[1] + '-' + newFecha[0];
          this.idCode = data.id;
          this.registerService.data = {
            email: this.email,
            password: this.password,
            name: this.name,
            surname1: this.lastName,
            surname2: this.lastNameMaterno,
            birthdate: newFechaFormat,
            gender: {
              id: this.sexoID,
              name: this.selectSexo
            },
            documentType: {
              id: 1,
              name: "D.N.I"
            },
            documentNumber: this.documentNumber,
            phone: this.phoneNumber,
            code: 1234,
            id: this.idCode
          }
          const code = 1234;
          this.registerService.registerNewUser(code).subscribe((data:any) => {
            this.router.navigate(['seguro-cura']);
            localStorage.setItem('session', JSON.stringify(data));
            this.reservasService.patientId = data.patientId;
          }, err => {
            if (err.error.result === 'error') {
              if(err.message = "Ya tienes usuario web"){
                this.documentInvalid = true;
                this.loaderSession = false;
              }else{
                this.mailInvalid = true;
                this.loaderSession = false;
              }
          }
          this.loaderSession = false;
          })
        }
      }, error => {
        if (error.error.result === 'error') {
            if(error.message = "Ya tienes usuario web"){
              this.documentInvalid = true;
              this.loaderSession = false;
            }else{
              this.mailInvalid = true;
              this.loaderSession = false;
            }
        }
        this.loaderSession = false;
      })
  }

  backButton(){
    window.history.back();
  }

  terminos(){
    const diallogRef = this.dialog.open(TerminosComponent, {
      data: 'aviva-cura'
    });
    diallogRef.afterClosed().subscribe(res => {
      console.log('cerrando login');

    })
  }

}
