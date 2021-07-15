import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservasService } from '../reservas.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/animation';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/shared/modal/alert/alert.component';
import { CreateParentComponent } from 'src/app/shared/modal/create-parent/create-parent.component';
import { DependensService } from 'src/app/services/dependens.service';

@Component({
  selector: 'app-seguro-cura',
  templateUrl: './seguro-cura.component.html',
  styleUrls: ['./seguro-cura.component.scss']
})
export class SeguroCuraComponent implements OnInit {
  @Input() page: string;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  progressPage = {
    page: 'avivaCura',
    state: 'seguro',
    pageDoctor: true,
    pageRegistro: true
  }

  public user: string;
  public show: boolean;

  //SEND SERVICE

  public dataService: any;

  public serviceId: any;
  public provisionsId: any;
  public doctorId: any;
  public fecha: any;

  public dataPago: any;
  public preloader: boolean;
  public loader: boolean = false;

  public color: any = 'warn';
  public mode: any = 'indeterminate';

  showBoxRadio: boolean = false;

  labelPosition;
  public price;
  public currentAppointment;
  plan: any;
  depe: any;
  hora: any;
  available: any;
  public doctor;
  public subida;
  public prestacion;
  public addFamily: boolean = false;
  personOk: boolean = false;
  parents: Object;
  public items;
  reservaData: any;
  financerInter: any;
  financerExter: any;
  financerPlanesBene: any;
  financerPlanesNoBene: any;
  appointmentId: any;
  appoiemendIdd: any;
  public appoinmentId: any;
  constructor(private router: Router,
    private reservasService: ReservasService,
    private dependensSrv: DependensService,
    private auth: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getDependens(); 
    console.log('data guardada en reservaService:', this.reservasService.dataJson);
    this.reservaData = this.reservasService.dataJson;
    this.reservasService._progressPage.next(this.progressPage);
  }

  getDependens() {
    this.dependensSrv.getDependens().subscribe(data => {
      this.parents = data;
    });
    console.log(this.parents);
  }

  changeState() {
    if (this.showBoxRadio) {
      this.showBoxRadio = false;
    } else {
      this.showBoxRadio = true;
    }
  }

  isUser() {
    if (this.auth.isUser() === 'user') {
      this.user = this.auth.User();
      this.show = true;
      return true
    } else {
      this.user = '';
      this.show = false;
      return false
    }
  }

  planesPaciente() {
    this.reservasService._progressPage.next(this.progressPage);
    if (this.reservasService.dataJson.length === 0) {
      this.router.navigate(['/'])
    } else {
      this.dataService = this.reservaData
      this.serviceId = this.dataService.service.id;
      this.doctorId = this.dataService.professional.id;
      console.log('reserva service dataJson:', this.reservasService.dataJson);
      this.fecha = moment(this.dataService.appointmentDateTime).format('YYYY-MM-DD');
      this.preloader = true;
      this.reservasService.getPlansFinanciador(this.serviceId, this.doctorId, this.fecha).subscribe((data: any) => {
        console.log(data)
        data.filter(x => x.plan_pk === 1 || x.plan_pk === 18);
        data.map(element => {
          if (element.precio.length > 0) {
            element.prestación = this.prestacion;
            element.price = element.precio[0].total;
            element.trackingId = this.eliminarDiacriticos(element.plan_desc);
            element.trackingId = element.trackingId.split(" ").join("-");
            element.trackingId = element.trackingId.toLowerCase()
          } else {
            element.price = 0
          }
        });

        this.dataPago = data;
        this.financerInter = this.dataPago.filter(x => x.es_paquete_propio == 0 && x.es_plan_propio == 0 && x.siteds == 0);
        this.financerExter = this.dataPago.filter(x => x.es_paquete_propio == 0 && x.es_plan_propio == 0 && x.siteds == 1);
        this.financerPlanesBene = this.dataPago.filter(x => x.es_paquete_propio == 1 && x.es_plan_propio == 0 && x.siteds == 0 && x.beneficios.length > 0);
        this.financerPlanesNoBene = this.dataPago.filter(x => x.es_paquete_propio == 1 && x.es_plan_propio == 0 && x.siteds == 0 && x.beneficios.length == 0);
        this.preloader = false;


      }, (error: any) => {

      })
    }
  }

  createParent() {
    //abrir modal con creación de familiar
    const dialogRef = this.dialog.open(CreateParentComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.parents = res.data;
      console.log(res.data) // received data from confirm-component
    })
  }

  passFinancer() {
    this.personOk = !this.personOk;
    this.personOk = false;
    this.addFamily = false;
    this.reservasService.parent = false;
    this.planesPaciente();
  }

  openParents() {
    this.addFamily = true;
    this.personOk = false;
    this.dataPago = []
    this.financerExter = [];
    this.financerInter = [];
    this.financerPlanesBene = [];
    this.financerPlanesNoBene = [];
    this.reservasService.parent = true;
  }

  passFinancerParent(depe) {
    console.log('this.reservaData:', this.reservaData);
    this.addFamily = false;
    this.personOk = true;
    this.depe = depe;
    this.reservasService.parent = true;
    console.log('this.depe:', this.depe);
    console.log('this.reservaData:', this.reservaData);
    let paciente_id = this.depe.patientId;
    let servicio_id = this.reservaData.service.id;
    let medico_id = this.reservaData.professional.id;
    let available = moment(this.reservaData.appointmentDateTime).format('YYYY-MM-DD');
    this.reservasService.getplanesContacto(paciente_id, servicio_id, this.prestacion, medico_id, available).subscribe((data: any) => {
      data.map(x => {
        data.prestación = this.prestacion;
      })
      this.dataPago = data;
      this.financerInter = this.dataPago.filter(x => x.es_paquete_propio == 0 && x.es_plan_propio == 0 && x.siteds == 0);
      this.financerExter = this.dataPago.filter(x => x.es_paquete_propio == 0 && x.es_plan_propio == 0 && x.siteds == 1);
      this.financerPlanesBene = this.dataPago.filter(x => x.es_paquete_propio == 1 && x.es_plan_propio == 0 && x.siteds == 0 && x.beneficios.length > 0);
      this.financerPlanesNoBene = this.dataPago.filter(x => x.es_paquete_propio == 1 && x.es_plan_propio == 0 && x.siteds == 0 && x.beneficios.length == 0);
      console.log(this.dataPago);
    })
  }

  select(season, seasons, data, data2) {
    this.reservasService.dataPlansClienteId = data2;
    this.reservasService.dataPlansCliente = data;
    this.reservasService.priceReser = seasons;
    this.reservasService.prestacion = this.prestacion;
    this.reservasService.financiador = season.Financiador;
    this.reservasService.dataJson.payer = {id:season.codigo_garante_pk};
    this.reservasService.dataJson.plan = {id: season.plan_pk};
    console.log('datos de: ', season,seasons,data,data2);
    if (this.reservasService.parent === true) {
      this.reservasService.parent = true;
      this.reservasService.parentId = this.depe._id;
      this.router.navigate(['pago']);
    } else {
      this.reservasService.parent = false;
      this.router.navigate(['pago'])
    }
  }

  selectCreate(season, seasons, data, data2){
    this.reservasService.dataJson.payer = {id: season.codigo_garante_pk};
    this.reservasService.dataJson.plan = {id: season.plan_pk};
    console.log('crear cita aqui');
    this.payLocal();
  }

  payLocal() {
    this.loader = true;
      this.reservasService.createAppoitment().subscribe((data: any) => {
        const appointmentId = data.appointmentId;
        this.appoinmentId = appointmentId;
        if (data.appointmentId) {
          const local = true;
          this.seveServiceNodos(local);

        }
      }, (error: any) => {
        console.log(error.error.responseData.errorCode);
        if (error.error.status === 400) {
          this.errorResponNotification(error.error.responseData.errorCode);
          this.loader = false;
        }
      })
  }

  
  confirmCreate(appoinmentId) {
    console.log('',appoinmentId);
    this.reservasService.confirmDate(this.appoinmentId).subscribe(confirm => {
      const resolve = confirm;
      console.log('confirm', resolve);
    })
  }

  
  selectPay() {
    console.log('sacar cita aqui');
    this.getAppoimentId();
  }

  getAppoimentId() {
    this.reservasService.createAppoitment().subscribe((data: any) => {
      this.currentAppointment = data
      this.appointmentId = this.currentAppointment.appoinmentId;
      if (data.appointmentId) {
        const local = true;
        this.seveServiceNodos(local);
        /*  this.appoiemendIdd = data.appointmentId; */
      }
    }, error => {
      // console.log(error)
      const data = {
        page: this.page,
        message: 'DURANTE TU PERIODO DE REGISTRO, TU RESERVA HA SIDO OCUPADA. POR FAVOR, VUELVE HA ELEGIR UNA FECHA U HORARIO'
      }
    })

  }

  seveServiceNodos(data) {
    this.confirmCreate(this.appoinmentId);
    console.log('data en el servicio de nodos:', data);
    const dataLocalStorage = JSON.parse(localStorage.getItem('session'));
    const jsonData = this.reservasService.dataJson;
    console.log('jsonData:', jsonData);
    const dataJson = {
      userId: dataLocalStorage.patientId,
      firstName: dataLocalStorage.name,
      lastName: dataLocalStorage.surname1,
      email: dataLocalStorage.userEmail,
      telephone: dataLocalStorage.phone,
      professionalName: jsonData.professional.fullName,
      appointmentDate: jsonData.appointmentDateTime,
      serviceName: jsonData.service.name,
      isPaymentAtTheLocal: data,
      payload: jsonData
    }
    console.log('dataJson', dataJson);
    this.reservasService.saveCitaNod(dataJson).subscribe((data: any) => {
      if (data.data.links[0].href) {
        this.reservasService.urlPdfWhatssap = data.data.links[0].href
        if (this.page === 'aviva-cura') {
          this.router.navigate(['avivacura/reserva-finalizada']);
        } else if (this.page === 'aviva-cuida') {
          this.router.navigate(['avivacuida/reserva-finalizada']);
        } else if (this.page === 'aviva-tele') {
          this.router.navigate(['avivacuida/reserva-finalizada']);
        } else {
          this.router.navigate(['/reserva-finalizada']);
        }
      }
    });
  }

  errorResponNotification(errorStatus) {
    if (errorStatus === 15001) {

      const data = {
        page: this.page,
        message: '¡Lo sentimos! Has superado el máximo de citas por servicio.',
        messageButton: 'ACEPTAR',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15002) {

      const data = {
        page: this.page,
        message: 'Disculpa. No podemos procesar tu solicitud. Has superado el máximo de citas por día.',
        messageButton: 'ACEPTAR',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15003) {
      const data = {
        page: this.page,
        message: '¡Lo sentimos! Has superado el máximo de citas por servicio y día.',
        messageButton: 'ACEPTAR',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15004) {
      const data = {
        page: this.page,
        message: 'Tu solicitud no puede ser procesada. Superaste el máximo de citas pendientes totales.',
        messageButton: 'ACEPTAR',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15006) {
      const data = {
        page: this.page,
        message: '¡Lo sentimos! Este horario ya no se encuentra disponible',
        messageButton: 'ACTUALIZAR CITA',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15009) {
      const data = {
        page: this.page,
        message: '¡Lo sentimos! Esta cita ya no se encuentra disponible.',
        messageButton: 'ACTUALIZAR CITA',
        errorCode: errorStatus
      }
      this.openAlert(data)
    } else if (errorStatus === 15035) {
      const data = {
        page: this.page,
        message: '¡Lo sentimos! Ya has agendado una cita para esa fecha.',
        messageButton: 'ACTUALIZAR CITA',
        errorCode: errorStatus
      }
      this.openAlert(data)
    }
  }

  // OPEN MODAL LOGIN
  openAlert(data): void {
    this.loader = false;
    const diallogRef = this.dialog.open(AlertComponent, {
      data: data
    });
    diallogRef.afterClosed().subscribe(res => {
      if (this.appoiemendIdd) {
        this.reservasService.delteCita(this.appoiemendIdd).subscribe((data: any) => {
        });
      }
      // this.router.navigateByUrl('/reservas/avivacura');
    })
  }

  eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  backLink() {
    window.history.back();
  }

}
