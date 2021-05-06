import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/animation';
import { ReservasService } from '../reservas.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  animations: [fadeIn]
})
export class PagoComponent implements OnInit {
  preloader: boolean = false;
  public inLocalPay: boolean = false;
  public color: any = 'warn';
  public mode: any = 'indeterminate';
  public loader: boolean = false;
  public tokenCulqi;

  public price;

  public appoiemendIdd;
  public financiador;

  progressPage = {
    page: 'avivaCuida',
    state: 'pago',
    pageDoctor: true,
    pageRegistro: true,
    pageSeguro: true
  }

  public messageAlert;

  constructor(public dialog: MatDialog, private reservasService: ReservasService, private router: Router) { }
  ngOnInit() {

    this.financiador = this.reservasService.financiador;
    if (this.reservasService.priceReser != '') {

      this.price = this.reservasService.priceReser;

      this.reservasService._progressPage.next(this.progressPage);

    } else {
      this.router.navigate(['/'])
    }

  }

  backLink() {
    window.history.back();
  }

  showEvent(even) {
    this.loader = even;

  }
}
