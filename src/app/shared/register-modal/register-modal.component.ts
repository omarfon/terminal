import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TerminosComponent } from 'src/app/modals/terminos/terminos.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RegisterService } from '../auth/+register/register.service';
import { ErrorRegisterComponent } from '../modal/error-register/error-register.component';
import { DataPacienteService } from './../../services/data-paciente.service';
import { CreateNoauthService } from './../../services/create-noauth.service';


@Component({
  selector: 'app-register-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register-modal.component.html',
  styleUrls: ['../../../../node_modules/simple-keyboard/build/css/index.css',
              './register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  value = " ";
  serviceError;
  public mailInvalid: boolean = false;
  public dniInvalid: boolean = false;
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

  public mode: string = 'indeterminate'
  // EXPRESIONS REGULAR
  public ER_NUM = /^([0-9])*$/;
  public ER_ONLY_NUM: any = /[0-9]/;
  public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  public ER_STR_MA: any = /[A-Z]/;
  public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  public datDni;

  public messageDni;
  public messageCrea;

  public dataResult;

  constructor(public RegisterService: RegisterService, 
              public dialogRed: MatDialogRef<RegisterModalComponent>, @Inject(MAT_DIALOG_DATA) 
              public message: string, 
              public AuthService: AuthService, 
              public router: Router, 
              public dialog: MatDialog, 
              public userSrv: UserService,
              public dataXhisSrv: DataPacienteService,
              public createNoAuthoSrv: CreateNoauthService) { }

  ngOnInit() {
    if (this.message === 'aviva-cuida') {

      document.querySelectorAll('body')[0].classList.add('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
    } else if (this.message === 'home' || this.message === 'reserva-doctor') {
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.add('aviva-home');
    } else if (this.message === 'aviva-cura') {
      document.querySelectorAll('body')[0].classList.add('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
    }
    else if (this.message === 'aviva-tele') {
      document.querySelectorAll('body')[0].classList.add('aviva-tele-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-tele-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
    }
    this.passwordValidate = false;

    this.RegisterService.userGenders()
      .subscribe(data => {
        this.sexoData = data;
        console.log(this.sexoData);
      }, error => {
      });

    /* this.RegisterService.userDocuments()
      .subscribe(data => {
        this.tipeDocumentService = data;
        console.log(this.tipeDocumentService);
      }, error => {

      }) */
  }

  //GET CODE
  getCode(email: any) {
    this.loaderSession = true;
    this.RegisterService.sendCode(email)
      .subscribe((data: any) => {

        if (data.result === 'ok') {
          const newFecha = this.birthday.split('/');
          const newFechaFormat: string = newFecha[2] + '-' + newFecha[1] + '-' + newFecha[0];

          this.onClickNo()

          this.idCode = data.id;
          this.RegisterService.data = {
            email: this.email,
            password: this.password,
            name: this.name,
            surname1: this.lastName,
            surname2: this.lastNameMaterno,
            birthdate: newFechaFormat,
            gender: {
              id: 2,
              name: "MUJER"
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
          if(data){
            this.RegisterService.registerNewUser(code).subscribe(data => {
              localStorage.setItem('session', JSON.stringify(data));
              if(this.message === 'aviva-cuida'){
                this.router.navigate(['seguro']);
              }else if(this.message === 'aviva-cura'){
                this.router.navigate(['seguro-cura']);
              }
            }, err =>{
              console.log('entro al error');
                this.dialog.open(ErrorRegisterComponent, {
                  data:err
                });
                this.router.navigate(['/']);
            })
          }
        }
      }, error => {
        if (error.error.result === 'error') {
          this.mailInvalid = true;
          this.loaderSession = false;
        }
      })
  }

  //SELECT GENDER
  selecGender(event) {
    this.selectSexo = event.target.selectedOptions[0].textContent;
    this.sexoID = event.target.value;
    if (this.sexo != this.selectSexo) {
      this.sexoValidate = true;
    } else {
      this.sexoValidate = false;
    }
  }
  activeRepeatPass() {
    if (this.passwordValidate === false) {
      this.activeRepeat = true;
    }
  }

  validatePass() {
    if (this.activeRepeat = true) {
      this.passwordRepeat = '';
      this.passwordRepeatValidate = false;
      this.validateMayus();
      this.validateLen();
      if (this.mayus && this.mayor) {
        this.passwordValidate = true;
        this.activeRepeat = false;
      } else {
        this.passwordValidate = false;
        this.activeRepeat = true;
      }
    }
  }

 /*  validaNum() {
    if (this.validateInput(this.ER_ONLY_NUM, this.password)) {
      this.isNum = true;
    } else {
      this.isNum = false;
    }
  } */

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

  // VALIDANDO PASS


  /* passRepeatKey() {
    this.passwordRepeatReadyValidate = true;
    if (this.password === this.passwordRepeat) {
      this.passwordRepeatValidate = true;
    } else {
      this.passwordRepeatValidate = false;
    }
  } */

  // VALIDATOR NUMBER

  // VALIDATOR STRING
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
  // CLOSE MODAL REGISTER
  onClickNo() {
    this.dialogRed.close();
  }

  // VALIDATE INPUTS EXPRESIONES REGULARES
  validateInput(expresion: any, input: string): boolean {
    if (expresion.test(input)) {
      return true;
    } else {
      return false;
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
  validateAllInputs(): boolean {
    if (this.nameValidate && this.lastNameValidate && this.lastNameMaternoValidate && this.documentValidate && this.birthdayValidate && this.phoneValidate && this.emailValidate && this.passwordRepeatValidate && this.checked && this.passwordValidate && this.sexoValidate) {
      return false;
    } else {
      return true;
    }
  }

  sendForm(): void {
    this.getCode(this.email);
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

  openModalTerminos(){
    this.dialog.open(TerminosComponent)
  }

  
 /*  getDataDni(){
    this.busqueda = true;
    this.userSrv.getDatosUser(this.documentNumber).subscribe((data:any) =>{
      if(data.dni){
        this.datDni = data;
        this.activate = true;
        this.name = this.datDni.name;
        this.lastName = this.datDni.first_name;
        this.lastNameMaterno = this.datDni.last_name;
        this.busqueda = false;
        console.log(this.datDni)
      }else{
        this.messageDni = "El dni no es valido, intente con otro..."
      }
    },err =>{
      console.log(err, 'error');
      this.busqueda = false;
    }
    )} */

    getDataDni(){
      this.dataXhisSrv.getDataXhis(1, this.documentNumber).subscribe(data => {
        this.dataResult = data;
        console.log(this.dataResult);
     /*    if(this.dataResult){
          this.createNoAuth();
        } */
        this.router.navigate([''])
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
