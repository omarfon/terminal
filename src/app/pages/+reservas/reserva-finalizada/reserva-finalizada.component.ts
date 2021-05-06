import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from '../reservas.service';
import * as moment from 'moment';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reserva-finalizada',
  templateUrl: './reserva-finalizada.component.html',
  styleUrls: ['./reserva-finalizada.component.scss']
})
export class ReservaFinalizadaComponent implements OnInit {
  public dataPlans: any;
  public stateNav = false;
  public preloader = true;

  public color: any = 'accent';
  public mode: any = 'indeterminate';

  public LinkWhatssap;
  public urlData = [
    {
      href: '',
    }
  ];
  public dataService: any = {
    r_fecha: '',
    hour: ''
  };
  public type;
  constructor(private sanitizer: DomSanitizer, private router: Router, private reservasService: ReservasService) { }

  ngOnInit() {
    this.preloader = true;
    if (this.reservasService.dataJson.length === 0) {
      this.router.navigate(['/'])
    } else {
      console.log('lo que viene de reservasService.dataJson:', this.reservasService.dataJson);
      console.log('lo que viene de dataService:', this.dataService);
      this.type = this.reservasService.dataJson.provisions[0].id;
      this.dataService = this.reservasService.dataJson;
      this.reservasService.getPdf().subscribe((data: any) => {
        this.urlData = data.data.links;
        this.LinkWhatssap = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlData[1].href);
      }, (error: any) => {
      })
      this.dataService.r_fecha = moment(this.dataService.appointmentDateTime).locale('es').format('LL');
      this.dataService.hour = moment(this.dataService.appointmentDateTime).locale('es').format('h:mm a');
      this.preloader = false;
    }
  }

}
