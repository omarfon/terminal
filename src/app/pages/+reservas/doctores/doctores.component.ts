import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../reservas.service';
import * as moment from 'moment';
import 'moment/locale/es'
import { fadeIn } from 'src/app/shared/animations/animation';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilComponent } from 'src/app/modals/perfil/perfil.component';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss'],
  animations: [fadeIn]
})
export class DoctoresComponent implements OnInit {

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
  
    // INFORMATION TO SERVICE
  
    public dateFirst = moment().format('YYYY-MM-DD');
    public dateSecond = moment().add(6, 'days').format('YYYY-MM-DD');

  constructor(public auth: AuthService, 
              public dialog: MatDialog, 
              private activeRoute: ActivatedRoute, 
              private reservasService: ReservasService, 
              public routes: Router) { }

  ngOnInit() {
    this.urlBase = this.auth.urlBaseAlter;
    this.reservasService._progressPage.next(this.progressPage);
    this.preloader = true;
 /*    this.activeRoute.params.subscribe(routeParams => {
    }); */
    /* this.id = routeParams.id; */
    this.id = this.reservasService.especialidad.id;
    /* this.speciallty = routeParams.description.split("-").join(" "); */
    this.speciallty = this.reservasService.especialidad.description;

    this.reservasService.getDoctorsSpecialty(this.id, this.dateFirst, this.dateSecond)
      .subscribe((data: any) => {

        this.provisionsData = data.centers[0].services[0].provision;
        if (this.provisionsData) {
          console.log('this.provisionsData:', this.provisionsData);
        }
        /* this.provisionsData = data.centers[0].services[0].provision; */

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
      })

  }

  resetDate(date: string) {
    date = moment(date).locale('es').format('dddd');
    return date;
  }

  stateShow(item: any, index) {
    this.boxID = item;
    this.boxCaID = index;
  }

  redirectTo(info, index, doctor, provisionsID, items) {
    console.log('ab', info, index, doctor, provisionsID, items);

    this.reservasService.provisionsId = provisionsID[0];
    const listjson = this.dataDoctors[doctor].availables[index].hours[info].listjson;
    console.log('lo que tiene e listJson:', listjson);
    const newJson = JSON.parse(listjson);

    this.reservasService.dateCita = moment(newJson.appointmentDateTime).locale('es').format('LLLL');
    newJson.provisions = [this.provisionsData];



    this.reservasService.dataJson = newJson;
    this.reservasService.dataJson = listjson;

    const session = JSON.parse(localStorage.getItem('session'));

    if (session.role === 'user') {
      this.routes.navigate(['seguro']);
    } else {
      this.routes.navigate(['registro']);
    }
  }


  // OPEN MODAL LOGIN
  openPerfil(data): void {
    const diallogRef = this.dialog.open(PerfilComponent, {
      data: {
        page: 'aviva-cuida',
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


}
