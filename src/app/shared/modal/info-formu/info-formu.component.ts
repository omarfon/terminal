import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/pages/+reservas/reservas.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { RegisterService } from '../../auth/+register/register.service';
import { DependensService } from 'src/app/services/dependens.service';

@Component({
  selector: 'app-info-formu',
  templateUrl: './info-formu.component.html',
  styleUrls: ['./info-formu.component.scss']
})
export class InfoFormuComponent implements OnInit {
  public passwordValidate;
  serviceError;
  public mailInvalid: boolean = false;
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
  public document: any = 'Tipo de documento';
  public selectdocument: any;
  public documentId;
  public tipeDocumentService;
  public hideBox: boolean = false;

  // NUMBER DOCUMENT
  public documentNumber: any = '';
  public documentReadyValidate: boolean = false;
  public documentValidate: boolean;

  // BIRTHDAY
  public birthday: any = '';
  public birthdayReadyValidate: boolean = false;
  public birthdayValidate: boolean;

  // NUMBER DOCUMENT
  public phoneNumber: any = '';
  public phoneReadyValidate: boolean = false;
  public phoneValidate: boolean;

  // EMAIL
  public email: string = '';
  public emailReadyValidate: boolean = false;
  public emailValidate: boolean;

  //PARENTESCO
  public parentesco: any = 'Parentesco';
  public selectParentesco: any;
  public parentescoId;
  public parentescoValidate: boolean = false;

  // VAR OF STATE
  public loaderSession: boolean = false;

  // ID CODE
  public idCode: any;
  public nacimiento;

  public mode: string = 'indeterminate'
  // EXPRESIONS REGULAR
  public ER_NUM = /^([0-9])*$/;
  public ER_ONLY_NUM: any = /[0-9]/;
  public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  public ER_STR_MA: any = /[A-Z]/;
  public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  activateDocumentNumber: boolean;
  color;
  public dataParent = {
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
    relation: {
      id: null,
      name: ''
    }
  }
  relationsService: Object;
  constructor(public RegisterService: RegisterService,
    public dependensSrv: DependensService,
    public reservaSrv: ReservasService,
    /* public message: string, */
    public dialogRed: MatDialogRef<InfoFormuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public AuthService: AuthService,
    public router: Router) { }

    ngOnInit() {
      /* if (this.message === 'aviva-cuida') {
  
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
      } */
      this.passwordValidate = false;
  
      this.RegisterService.userGenders()
        .subscribe(data => {
          this.sexoData = data;
  
        }, error => {
        });
  
      this.RegisterService.userDocuments()
        .subscribe(data => {
          this.tipeDocumentService = data;
        }, error => {
  
        })
  
      this.RegisterService.userRelations()
        .subscribe(data => {
          this.relationsService = data;
          console.log('relaciones:', this.relationsService);
        }, error => {
  
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
  
    //SELECT PARENTESCO
    selecParentesco(event) {
      this.selectParentesco = event.target.selectedOptions[0].textContent;
      this.parentescoId = event.target.value;
      if (this.parentesco != this.selecParentesco) {
        this.parentescoValidate = true;
      } else {
        this.parentescoValidate = false;
      }
    }
  
    selectDocument(event) {
      const documentType = event.target.selectedOptions[0].textContent;
      if (documentType === 'No Tiene') {
        this.hideBox = true;
      } else {
        this.hideBox = false;
        this.documentNumber = '';
        this.selectdocument = event.target.selectedOptions[0].textContent;
        this.activateDocumentNumber = false;
        this.documentId = event.target.value;
      }
    }
  
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
  
      else if (this.documentReadyValidate && data === this.documentNumber) {
        if (data === this.documentNumber) {
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
      this.nacimiento = this.birthday;
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
      if (this.nameValidate && this.lastNameValidate && this.lastNameMaternoValidate && this.documentValidate && this.birthdayValidate && this.sexoValidate && this.parentescoValidate) {
        return false;
      } else {
        return true;
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
  
  
    sendForm(): void {
      const newFecha = this.birthday.split('/');
      const newFechaFormat: string = newFecha[2] + '-' + newFecha[1] + '-' + newFecha[0];
  
      this.loaderSession = true;
  
      this.dataParent.name = this.name;
      this.dataParent.surname1 = this.lastName;
      this.dataParent.surname2 = this.lastNameMaterno;
      this.dataParent.birthdate = newFechaFormat;
      this.dataParent.gender.id = this.sexoID;
      this.dataParent.gender.name = this.selectSexo;
      this.dataParent.documentType.id = +this.documentId;
      this.dataParent.documentType.name = this.selectdocument;
      this.dataParent.documentNumber = this.documentNumber;
      this.dataParent.relation.id = this.parentescoId;
      this.dataParent.relation.name = this.selectParentesco;
  
  
      const data = this.dataParent;
      console.log('data:', data);
      this.reservaSrv.createParent(data).subscribe((datos: any) => {
        this.loaderSession = false;
        if (datos.result === 'ok') {
          this.dependensSrv.getDependens().subscribe(data => {
            this.dialogRed.close({ data: data });
          })
        }
      }, error => {
        /*       this.dialogRed.close(); */
        console.log('error', error);
      })
    }
  
  
  
    backLink() {
      window.history.back();
    }

}
