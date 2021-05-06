import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fadeIn } from '../../animations/animation'
import { RegisterService } from './register.service';
import { ConditionalExpr } from '@angular/compiler';
import { Router } from '@angular/router';
/* import { element } from '@angular/core/src/render3'; */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [
    fadeIn
  ]
})
export class RegisterComponent implements OnInit {

  public sucess: boolean = false;

  public noValidate: boolean;

  //VALIDATION
  public nameForm: boolean = false;
  public surname1Form: boolean = false;
  public surname2Form: boolean;
  public SelectGenderForm: boolean;
  public tipoDocumentoForm: boolean;
  public documentNumberForm: boolean;
  public birthdateForm: boolean;
  public emailForm: boolean;
  public passwordForm: boolean;
  public password2Form: boolean;
  public phoneForm: boolean;
  public genderForm: boolean;
  public checkForm: boolean;

  // EXPRESIONS REGULAR
  public ER_NUM = /^([0-9])*$/;
  public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

  // SEND INFO
  public email: string;
  public password: string = '';
  public password2: string;
  public name: string = '';
  public surname1: string = '';
  public surname2: string = '';
  public birthdate: string = '';
  public genderId;
  public genderNAme;
  public documentTypeId;
  public documentTypeName;
  public documentNumber: any;
  public phone: string;
  public code: string;
  public id: string;
  public values: string = '';
  // VAR GET INFO
  public gendersService: any;
  public typeDocument: any;
  public checkbox: boolean;

  public tipoDocumento: string = 'documento';
  public SelectGender: string = "sexo";

  public data = {
    email: '',
    password: '',
    name: '',
    surname1: '',
    surname2: '',
    birthdate: '',
    gender: {
      id: null,
      name: ''
    },
    documentType: {
      id: null,
      name: ''
    },
    documentNumber: '',
    phone: '',
    code: '',
    id: ''
  }

  constructor(private RegisterService: RegisterService, private Router: Router) {

  }

  ngOnInit() {

    this.RegisterService.userGenders()
      .subscribe(data => {
        this.gendersService = data;
      }, error => {

      });

    this.RegisterService.userDocuments()
      .subscribe(data => {
        this.typeDocument = data;
      }, error => {

      })
  }

  selecDocument(event: any) {
    this.documentTypeName = event.target.selectedOptions[0].textContent;
  }

  selecGender(event: any) {
    this.genderNAme = event.target.selectedOptions[0].textContent;
  }

  sendCode(email: any) {
    this.RegisterService.sendCode(email)
      .subscribe((data: any) => {
        if (data.result === 'ok') {
          this.data.id = data.id;
          this.RegisterService.data = this.data;
          this.Router.navigate(['registrarse/validate-code']);
        }
      }, error => {

      })

  }

  // SAVE DATA
  saveData() {
    this.data.email = this.email;
    this.data.password = this.password,
      this.data.name = this.name;
    this.data.surname1 = this.surname1;
    this.data.surname2 = this.surname2;
    this.data.birthdate = this.birthdate;
    this.data.gender.id = +this.SelectGender;
    this.data.gender.name = this.genderNAme;
    this.data.documentType.id = +this.tipoDocumento;
    this.data.documentType.name = this.documentTypeName;
    this.data.documentNumber = this.documentNumber;
    this.data.phone = this.phone;

    this.data.id = this.id;
    this.data.id = this.id;

    this.sendCode(this.data.email)

  }

  // VALIDATE INPUTS
  validateInputs() {
    if (this.nameForm === true && this.surname1Form === true && this.surname2Form === true && this.documentNumberForm === true && this.phoneForm === true && this.emailForm === true && this.password2Form === true && this.checkForm === true && this.birthdate.length > 1 && this.SelectGender != 'sexo') {
      return false

    } else {
      return true
    }
  }

  // SEND DATE
  //VALIDATE STRING
  onkeySurname1() {
    if (this.ER_STR.test(this.surname1)) {
      this.surname1Form = true;
      if (this.surname1.length > 1) {
        this.sucess = true;
      } else {
        this.sucess = false;
      }
    } else {
      this.surname1Form = false;
    }
  }
  //VALIDATE STRING
  onkeySurname2() {
    if (this.ER_STR.test(this.surname2)) {
      this.surname2Form = true;
      if (this.surname2.length > 1) {
        this.sucess = true;
      } else {
        this.sucess = false;
      }
    } else {
      this.surname2Form = false;
    }
  }

  //VALIDATE STRING
  onkeyDocumentNumber() {
    if (this.ER_NUM.test(this.documentNumber)) {
      this.documentNumberForm = true;
      if (this.documentNumber.length > 1) {
        this.sucess = true;
      } else {

      }
    } else {
      this.documentNumberForm = false;
    }
  }

  //VALIDATE STRING
  onkeyEmail() {
    if (this.ER_EMA.test(this.email)) {
      this.emailForm = true;
      if (this.email.length > 1) {
        this.sucess = true;
      } else {
        this.sucess = false;
      }
    } else {
      this.emailForm = false;
    }
  }
  //VALIDATE STRING
  onkeyPasswords() {
    if (this.password) {
      this.passwordForm = true;
      if (this.password === this.password2) {
        this.password2Form = true;
      } else {
        this.password2Form = false;
      }
    } else {
      this.passwordForm = false;
    }

  }

  //VALIDATE STRING
  onkeyPhone() {
    if (this.ER_NUM.test(this.phone)) {
      this.phoneForm = true;
      if (this.phone.length > 1) {
      } else {
        this.sucess = false;
      }
    } else {
      this.phoneForm = false;
    }
  }


  //VALIDATE STRING
  onkeyName() {
    if (this.ER_STR.test(this.name)) {
      this.nameForm = true;
      if (this.name.length > 1) {
      } else {
        this.sucess = false;
      }

    } else {
      this.nameForm = false;
    }
  }

  checkbosx(event: any) {
    const check = event.target.checked;
    this.checkForm = check;

  }

  onChange() {

  }
}
