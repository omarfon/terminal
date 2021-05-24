import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgradecimientoComponent } from 'src/app/modals/agradecimiento/agradecimiento.component';
import { BeneficesService } from 'src/app/services/benefices.service';
import { InfoFormuComponent } from 'src/app/shared/modal/info-formu/info-formu.component';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent implements OnInit {
  serviceError;
  public name: string = '';
  public nameReadyValidate: boolean = false;
  public nameValidate: boolean;

  public phoneNumber: any = '';
  public phoneReadyValidate: boolean = false;
  public phoneValidate: boolean;

    // EMAIL
    public email: string = '';
    public emailReadyValidate: boolean = false;
    public emailValidate: boolean;

  public week 
  public selectdocument: any;
   // VAR OF STATE
   public loaderSession: boolean = false;
   public mailInvalid: boolean = false;
   public program;

  // EXPRESIONS REGULAR
  public ER_NUM = /^([0-9])*$/;
  public ER_ONLY_NUM: any = /[0-9]/;
  public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  public ER_STR_MA: any = /[A-Z]/;
  public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

  public programas = [
    {
      name:"Programa parto natural",
      costo:"1 980",
    },
    {
      name:"Programa Superior natural",
      costo:"2 370",
    },
    {
      name:"Programa Integral natural",
      costo:"2 990",
    },
    {
      name:"Programa parto césarea",
      costo:"4 350",
    },
    {
      name:"Programa superior Césarea",
      costo:"4 700",
    },
    {
      name:"Programa integral Césarea",
      costo:"5 393",
    }
  ]
  documentNumber: string;
  hideBox: boolean;
  documentId: any;
  activateDocumentNumber: boolean;
  constructor(public dialog: MatDialog, 
              public beneficesSrv: BeneficesService) { }

  ngOnInit() {
  }

  openModalInfo(){
    this.dialog.open(InfoFormuComponent)
  }

  // VALIDATOR STRING
  onkeyValidateString(data: any): void {
    if (this.nameReadyValidate && data === this.name) {
      if (data === this.name) {
        this.blurValidateString(data);
      }
    }

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

  // VALIDATE INPUTS EXPRESIONES REGULARES
  validateInput(expresion: any, input: string): boolean {
    if (expresion.test(input)) {
      return true;
    } else {
      return false;
    }
  }

  saveData(){
    const data = {
      name: this.name,
      phone: this.phoneNumber,
      email: this.email,
      weeks: this.week,
      day: new Date(),
      program: this.program,
  }
  console.log('data en enviar:',data);
  this.beneficesSrv.saveData(data).then(data => {
    this.name = "";
    this.phoneNumber ="";
    this.email = "";
    this.week = "";
    this.program = "";
    this.dialog.open(AgradecimientoComponent);
  })
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

}
