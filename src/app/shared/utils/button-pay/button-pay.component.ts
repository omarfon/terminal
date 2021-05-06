import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ReservasService } from 'src/app/pages/+reservas/reservas.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from '../../modal/alert/alert.component';
import { ErrorPaymentComponent } from '../../modal/error-payment/error-payment.component';

declare const window: any;
@Component({
  selector: 'app-button-pay',
  templateUrl: './button-pay.component.html',
  styleUrls: ['./button-pay.component.scss']
})
export class ButtonPayComponent implements OnInit {
  @Input() idLocal: string;
  @Input() idTarjeta: string;
  @Input() page: string;

  public inLocalPay: boolean = false;
  public color: any = 'warn';
  public mode: any = 'indeterminate';
  public loader: boolean = false;
  public tokenCulqi;
  keyCulqi;
  public price;

  public appoiemendIdd = '';

  public messageAlert;
  dataInfoPlans;

  dataInfoPlansId;

  dataUser: any;

  email;
  public type;
  public check;
  public currentAppointment;
  public appointmentId;
  public parent;
  public typeCita;
  public financiador;
  public culqiApp: any = window.Culqi;
  constructor(public auth: AuthService,
    public dialog: MatDialog,
    private reservasService: ReservasService,
    private router: Router) { }

    public data_opciones = {
      lang: 'es',
      modal: true,
      installments: false,
      style: {
        desctext: '#20668B',
        logo: 'https://raw.githubusercontent.com/akobashikawa/images/master/aviva-logo-240.png'
      }
    }
    ngOnInit() {
      this.financiador = this.reservasService.financiador;
      console.log('this.financiador:',this.financiador);
      this.parent = this.reservasService.parent;
      console.log('this.parent en button culqi:', this.parent);
      this.auth.getDatosUsers().subscribe((dataa: any) => {
        this.email = dataa.email;
        // console.log(this.email)
      })
      this.keyCulqi = this.auth.apiKeyCulqi;
      this.dataUser = JSON.parse(localStorage.getItem('session'));
  
      this.dataInfoPlans = this.reservasService.dataPlansCliente;
      this.dataInfoPlansId = this.reservasService.dataPlansClienteId;
  
      const jsonData = this.reservasService.dataJson;
      console.log('buttons y jsonData:', jsonData);
      if (jsonData) {
        this.type = jsonData.visitType.name;
        console.log(this.type);
      }
      window.Culqi.token = null
      if (this.reservasService.priceReser != '') {
  
        this.price = this.reservasService.priceReser;
  
        // DEV
        this.culqiApp.publicKey = this.keyCulqi;
  
        this.culqiApp.settings({
          title: 'Clínica Aviva',
          currency: 'PEN',
          description: 'primera compra de aviva',
          amount: this.price * 100
        });
  
        this.culqiApp.options(this.data_opciones)
        window.culqi = this.culqi.bind(this);
  
      } else {
        this.router.navigate(['/'])
      }
  
    }
  
    culqi() {
      if (window.Culqi.token) {
        this.loader = true;
        this.tokenCulqi = window.Culqi.token.id;
        const data = {
          amount: this.price * 100,
          currency_code: "PEN",
          email: this.email,
          metadata: {
            patientId: this.currentAppointment.patient.id,
            appointmentId: this.appoiemendIdd,
            planId: this.dataInfoPlansId,
            precioSinIGV: this.dataInfoPlans[0].prest_precio_val,
            precioConIGV: this.dataInfoPlans[0].total
          },
          source_id: this.tokenCulqi
        }
        this.sendCharged(data).subscribe(data => {
          // console.log(data)
          if (data.message === 'ok') {
            const local = false
            this.seveServiceNodos(local);
  
          } else if (data.status === 402) {
            console.log('this.type en error:', this.type);
            this.typeCita = this.reservasService.provisionsId;
            if (this.typeCita === 845337) {
              this.loader = false;
              const data = {
                page: this.page,
                redirect: false,
                button: true,
                message: 'Hubo un error con tu tarjeta a la hora del pago, consulta con tu banco. Tu cita no ha podido ser reservada, intenta nuevamente con la reserva'
              }
              this.openErrorData(data);
              /* this.router.navigate(['reservas']); */
            } else {
              this.reservasService.delteCita(this.appoiemendIdd);
              this.loader = false;
              const data = {
                page: this.page,
                redirect: false,
                button: false,
                message: 'Hubo un error con tu tarjeta a la hora del pago, No te preocupes tu cita ha sido reservada igualmente, recuerda que puedes pagar en la clínica el día de tu atención'
              }
              this.openErrorData(data);
              this.router.navigate(['avivacura/reserva-finalizada']);
            }
          }
        }, err => {
          console.log('error en el culqiCharges:', err);
        });
      } else {
  
      }
    }
  
    openErrorData(data) {
      this.dialog.open(ErrorPaymentComponent, { data: data })
    }
  
    sendCharged(data) {
      const _dataObs: Subject<any> = new Subject;
      this.reservasService.startPayCulqi(data).subscribe((dataService: any) => {
        _dataObs.next(dataService)
      }, error => {
        _dataObs.next(error)
      });
      return _dataObs;
    }
  
    validateCita() {
      this.loader = true;
      this.reservasService.validateCita().subscribe((data: any) => {
        if (data === true) {
          this.loader = false;   
  
          this.showEvent();
        } else {
  
          this.loader = false;
          const data = {
            page: this.page,
            message: 'DURANTE TU PERIODO DE REGISTRO, TU RESERVA HA SIDO OCUPADA. POR FAVOR, VUELVE HA ELEGIR UNA FECHA U HORARIO'
          }
          this.openAlert(data)
        }
      }, error => {
        // console.log(error)
        this.loader = false;
        this.errorResponNotification(error.error.responseData.errorCode);
  
      })
    }
  
    //FIRST GET ID JSONLIST
    getAppoimentId() {
      if (this.parent === true) {
        console.log('crear appointment para familiar');
        this.reservasService.createParentDate().subscribe((data: any) => {
          this.currentAppointment = data
          this.appoiemendIdd = data.appointmentId;
          console.log('this.currentAppointment en creación parent:', this.currentAppointment);
        })
      } else {
        this.reservasService.createAppoitment().subscribe((data: any) => {
          this.currentAppointment = data
          this.appointmentId = this.currentAppointment.appoinmentId;
          if (data.appointmentId) {
            this.appoiemendIdd = data.appointmentId;
          }
        }, error => {
          // console.log(error)
          const data = {
            page: this.page,
            message: 'DURANTE TU PERIODO DE REGISTRO, TU RESERVA HA SIDO OCUPADA. POR FAVOR, VUELVE HA ELEGIR UNA FECHA U HORARIO'
          }
          this.openAlert(data);
        })
      }
    }
  
    // OPEN CULQI
    showEvent() {
      this.getAppoimentId();
      this.culqiApp.settings({
        title: 'Clínica Aviva',
        currency: 'PEN',
        description: 'primera compra de aviva',
        amount: this.price * 100
      });
      this.culqiApp.open();
    }
  
    startPay() {
      // EVENT PRELOADER
      this.loader = true;
      // PAY IN LOCAL TRUE
      this.inLocalPay = true;
      console.log(this.appoiemendIdd);
      if (this.appoiemendIdd) {
        this.reservasService.delteCita(this.appoiemendIdd).subscribe((data: any) => {
          if (data) {
            this.payLocal()
          }
        });
      } else {
        this.payLocal();
      }
    }
  
    payLocal() {
      if (this.parent == true) {
        console.log('crear appointment para familiar');
        this.reservasService.createParentDate().subscribe((data: any) => {
          this.currentAppointment = data
          this.appoiemendIdd = data.appointmentId;
          const local = true;
          this.seveServiceNodos(local);
          console.log('this.currentAppointment en creación parent:', this.currentAppointment);
        })
      } else {
        this.reservasService.createAppoitment().subscribe((data: any) => {
          console.log('entro al pago de reserva')
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
    }
  
    checkStatus() {
      this.check = setInterval(() => {
        this.reservasService.chekstatusAppointment(this.appointmentId).subscribe(async (status: any) => {
          console.log({ status })
          if (status.status === "pendiente") {
            console.log('sigue pendiente');
          } else {
            window['Culqi'].close();
            clearInterval(this.check);
          }
        })
      },
        30000)
    }
  
    checkStatusParent() {
      const userId = this.currentAppointment.patient.id;
      const appointmentId = this.currentAppointment.appointmentId;
      this.check = setInterval(() => {
        this.reservasService.chekstatusAppointmentParent(userId, appointmentId).subscribe(async (status: any) => {
          console.log({ status });
          if (status.status === "pendiente") {
            console.log('sigue pendiente');
          } else {
            window['Culqi'].close();
            clearInterval(this.check);
          }
        })
  
      },
        30000)
    }
  
    confirmCreate(appointmentId) {
      this.reservasService.confirmDate(appointmentId).subscribe(confirm => {
        console.log({ confirm });
      })
    }
  
    confirmCreateParent(patientId, appointmentId) {
      this.reservasService.confirmDateParent(patientId, appointmentId).subscribe(confirm => {
        console.log({ confirm })
      })
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
  
    seveServiceNodos(data) {
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
            this.router.navigate(['reserva-finalizada']);
        }
      });
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
  
    backLink() {
      window.history.back();
    }
}
