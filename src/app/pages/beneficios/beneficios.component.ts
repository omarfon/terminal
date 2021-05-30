import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgradecimientoComponent } from 'src/app/modals/agradecimiento/agradecimiento.component';
import { FormularioComponent } from 'src/app/modals/formulario/formulario.component';
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

   public preloader = false;
  public color: any = 'accent';
  public mode: any = 'indeterminate';
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

openModalFormulario(){
  this.dialog.open(FormularioComponent)
}
}
