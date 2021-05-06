import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InfoFormuComponent } from 'src/app/shared/modal/info-formu/info-formu.component';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openModalInfo(){
    this.dialog.open(InfoFormuComponent)
  }

}
