import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../reservas.service';
import * as moment from 'moment';
import 'moment/locale/es'
import { fadeIn } from 'src/app/shared/animations/animation';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNoauthService } from './../../../services/create-noauth.service';
import { ModalDetailDoctorsComponent } from 'src/app/modals/modal-detail-doctors/modal-detail-doctors.component';

@Component({
  selector: 'app-doctores-cura',
  templateUrl: './doctores-cura.component.html',
  styleUrls: ['./doctores-cura.component.scss'],
  animations: [fadeIn]
})
export class DoctoresCuraComponent implements OnInit {
   // progressPage = 'doctores';
   progressPage = {
    page: 'avivaCuida',
    state: 'doctores',
    pageRedy: true
  }
  public color: any = 'warn';
  public mode: any = 'indeterminate';

  pageReady = true;
  stateShoww: boolean;
  boxID: any = null;
  boxCaID: any = null;

  public progress = 75;
  public id: any;
  public dataDoctors: any;
  public preloader: boolean;
  public manyBoxes: any;
  public speciallty: string;
  public urlBase;
  datesCalendar: any;
  provisionsData;

  public especialidad;
  public doctorEscogido;
  public doctorVisible = false;
  public hours;
  public chargeHours = false;

  // INFORMATION TO SERVICE

  public dateFirst = moment().format('YYYY-MM-DD');
  public dateSecond = moment().add(6, 'days').format('YYYY-MM-DD');
  constructor(public auth: AuthService, 
    public dialog: MatDialog, 
    private activeRoute: ActivatedRoute, 
    private reservasService: ReservasService, 
    public createNoAutho: CreateNoauthService,
    public routes: Router) { }

  ngOnInit() {
    this.urlBase = this.auth.urlBaseAlter;
    this.reservasService._progressPage.next(this.progressPage);
    this.preloader = true;
    this.id = this.reservasService.especialidad.id;
    this.speciallty = this.reservasService.especialidad.description;

/*     this.reservasService.getDoctorsSpecialty(this.id, this.dateFirst, this.dateSecond)
      .subscribe((data: any) => {

        this.provisionsData = data.centers[0].services[0].provision;
        if (this.provisionsData) {
          console.log('this.provisionsData:', this.provisionsData);
        }
        if (data) { this.preloader = false }

        var start = Date.now();

        const docts = data.centers[0].services[0].professionals.filter((element) => {
          return element.availables.length > 0;
        })
        this.manyBoxes = docts.length;
        docts.forEach(element => {
          const fech = element.availables;
          this.datesCalendar = fech;

          fech.forEach(dat => {
            dat.hours.hour = dat.hours.map((element: any) => {
              return element.hour.slice(0, 5);
            });
            dat.newFormatDay = moment(dat.date).locale('es').format('DD');
            dat.date = moment(dat.date).locale('es').format('dddd').slice(0, 3);
          });

        });
        this.dataDoctors = docts;

        var end = Date.now();

      }, (error: any) => {
      }) */
      this.getDoctorWDates();
  }

  getDoctorWDates(){
    this.reservasService.getDoctorsSpecialtyBD(this.id).subscribe((data:any) => {
      console.log('data recibida de nuevo endpoint:',data);
      this.preloader = false; 
        this.dataDoctors = data;
        }) 
  }

  resetDate(date: string) {
    date = moment(date).locale('es').format('dddd');
    return date;
  }

  stateShow(item: any, index, items) {
    this.hours = [];
    this.chargeHours = true;
    this.boxID = item;
    this.boxCaID = index;
    const dataDate = items;
    console.log('llamado de horas para el dia', item, index, items);
    let data = {
      fromDateString: items.fecha + 'T00:00:00.000',
      toDateString: items.fecha + 'T00:00:00.000',
      centerId: items.cod_centro,
      basicServiceId: items.serv_bas_pk,
      professionalId: items.codigo_personal,
      provisions : [
        items.prest_item_pk
      ]
    } 
    this.reservasService.getDoctorsSlotsPerDay(data).subscribe((resp:any) => {
      this.hours = resp[0].appointmentDateTimes;
        console.log('horas solicitadas:',resp);
      this.chargeHours = false;
    })
  }

  redirectTo(item, items) {
    console.log('ab', item, items);

    this.reservasService.provisionsId = items.params.provisionId[0];
    const listjson = items.listjson;
    this.reservasService.dataJson = listjson;
    console.log('lo que tiene e listJson:', listjson);
    const newJson = JSON.parse(listjson);

    this.reservasService.dateCita = moment(newJson.appointmentDateTime).locale('es').format('LLLL');
    newJson.provisions = [this.provisionsData];
    this.reservasService.dataJson = newJson;
    const session = JSON.parse(localStorage.getItem('session'));
    if (session.role === 'user') {
      this.routes.navigate(['seguro']);
    } else {
      this.routes.navigate(['registro-cura']);
    }
  }


  // OPEN MODAL LOGIN
  openLogin(data): void {
    const diallogRef = this.dialog.open(ModalDetailDoctorsComponent, {
      data: {

        page: 'aviva-cura',
        infoDetails: data

      },
      width: 'auto'
    });
    diallogRef.afterClosed().subscribe(res => {

    })
  }

 

  eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  backLink(){
    window.history.back();
  }

  

}
