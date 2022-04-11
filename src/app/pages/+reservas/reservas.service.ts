import { Injectable } from '@angular/core';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ReservasService {



  _progressObs: Subject<any> = new Subject();
  _progressPage: Subject<any> = new Subject();

  public dataPlansCliente;
  public dataPlansClienteId;
  public prestacion;
  public dateCita;
  public parent;
  public parentId;
  public parentIdCreate;
  public patientId;
  public infoCita;
  public idParent;
  public dependens;
  public financiador;
  public especialidad;

  public urlPdfWhatssap: string = '';
  public dataJson: any = [];
  public id = 1;
  public provisionsId;
  public dataCreateParent;

  public priceReser: any = '';
  public provisions: any;
  private url = environment.urlBaseAlter;
  public dataPaciente;
  public dataPacienteReniec;
  public sexoData;
  public tipeDocumentService;
  public relationsService;

  constructor(private Authservice: AuthService, private http: HttpClient) { }

  urlBaseNodos = this.Authservice.getUrlBaseNodos();
  urlBase = this.Authservice.getUrlBase();
  get progressObs() {
    return this._progressObs;
  }
  get progressPage() {
    return this._progressPage;
  }

  getSpecialty() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    console.log('data')
    return this.http
      .get(this.urlBase + 'api/v2/ebooking/fmt-centers/all/services', {headers});
  }

  getDoctorsSpecialty(params: any, date1: any, date2: any) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    return this.http
      .get(this.urlBase + 'api/v2/ebooking/fmt-centers/1/services/' + params + '/professionals/all/availables?from_date=' + date1 + '&to_date=' + date2, {headers});
  }

  getDoctorsSpecialtyBD(params: any) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.urlBase + 'api/v2/ebooking/fmt-centers/1/basicservices/' + params + '/professionals/1/info-for-availables-kiosko', {headers});
  }

  getDoctorsSlotsPerDay(data: any) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    let params = data;
    return this.http
      .post(this.urlBase + 'api/v2/ebooking/slots/availables-extra', params, {headers});
  }

  createAppoitment() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    console.log(this.provisionsId)
    console.log(this.dataJson)
    this.dataJson.provisions = [{ "default": false, "id": this.provisionsId }];
    return this.http
      .post(this.urlBase + 'api/v2/ebooking/appointments/create', this.dataJson , {headers}) ;
  }

  createParentDate() {
    console.log('dataJson en createParent', this.dataJson);
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    let params = this.dataJson;
    this.dataJson.provisions = [{ "default": false, "id": this.provisionsId }];

    return this.http.post(this.urlBase + `api/v2/ebooking/appointments/createForUser/${this.parentId}`, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  startPayCulqi(data: any) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .post(this.urlBase + 'api/v2/ebooking/culqi-charges', data, {headers});
  }

  getPlansFinanciador(service_id, doctorId, fecha) {
/*     const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization }); */

    return this.http
      .get(this.urlBase + 'api/v2/ebooking/planes-paciente-precio-prestacionNoAutho?center_id=1&servicio_id=' + service_id + '&prestacion_id=' + this.provisionsId + '&medico_id=' + doctorId + '&fecha=' + fecha + '&patientId=' + this.patientId)
  }

  getplanesContacto(paciente_id, servicio_id, prestacion_id, medico_id, proposed_date) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    return this.http.get(this.urlBase + `api/v2/ebooking/planes-paciente-contacto-precio-prestacion?paciente_id=${paciente_id}&servicio_id=${servicio_id}&prestacion_id=${this.provisionsId}&medico_id=${medico_id}&fecha=${proposed_date}`, { headers }).pipe(
      map(data => {
        return data
      })
    )
  }

  getplanesContactoNoAutho(paciente_id, servicio_id, prestacion_id, medico_id, proposed_date) {
   /*  const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization }); */

    return this.http.get(this.urlBase + `api/v2/ebooking/planes-paciente-contacto-precio-prestacionNoAutho?paciente_id=${paciente_id}&servicio_id=${servicio_id}&prestacion_id=${this.provisionsId}&medico_id=${medico_id}&fecha=${proposed_date}&contactId=${this.parentId}` ).pipe(
      map(data => {
        return data
      })
    )
  }

  delteCita(cita) {
    console.log('delete cita principal', cita)
    const appointmentId = cita.appointmentId;
    return this.http
      .delete(this.urlBase + 'api/v2/ebooking/appointments/' + appointmentId + ' ')
  }

  destroyAppointmentContact(appointment) {
    console.log('delete cita parent:', appointment);
    const patientId = appointment.patientId;
    const appointmentId = appointment.appointmentId;
    console.log('lo que se va a eliminar cita fmiliar', patientId, appointmentId);
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    return this.http.delete(this.urlBase + `api/v2/ebooking/appointments/patient-contacts/${patientId}/${appointmentId}/`, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

 /*  createParent(data) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    let params = data;

    return this.http.post(this.urlBase + `api/v2/users/register-dependent/`, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  } */
  createParent(data) {
    let params = data;

    return this.http.post(this.urlBase + `api/v2/users/register-dependentNoAutho/${this.patientId}`, params).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  validateCita() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    this.dataJson.provisions = [{ "default": false, "id": `${this.provisionsId}` }];
    return this.http
      .post(this.urlBase + 'api/v2/ebooking/appointments/validate', this.dataJson, {headers})
  }

  saveCitaNod(data) {
    const authorization = localStorage.getItem('publicAutho');
    let headers = new HttpHeaders({ "Authorization": authorization });
    return this.http
      .post(this.urlBaseNodos + 'appointments/reserve', data, {headers})
  }

  getPdf() {
    return this.http
      .post(this.urlPdfWhatssap, this.id)
  }

  getDoctorsPerId(id) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });
    const center_id = 1;

    return this.http.get(this.urlBase + `ebooking/fmt-centers/${center_id}/services/${id}/professionals`, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }

  chekstatusAppointment(appointmentId) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.urlBase + `api/v2/ebooking/appointments/${appointmentId}/status`, { headers }).pipe(
      map(resp => {
        return resp
      })
    )
  }


  chekstatusAppointmentParent(patientId, appointmentId) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.urlBase + `api/v2/ebooking/appointments-contact/${patientId}/${appointmentId}/status`, { headers }).pipe(
      map(resp => {
        return resp
      })
    )
  }

  confirmDate(appointmentId) {
    console.log('appointment en servicio confirm',appointmentId);
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });
    /* let params = [{data:'data'}]; */

    return this.http.post(this.urlBase + `api/v2/ebooking/appointments/${appointmentId}/confirm`, { headers }).pipe(
      map(resp => {
        return resp
      })
    )
  }

  confirmDateParent(patientId, appointmentId) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });
    let params = "";

    return this.http.post(this.urlBase + `api/v2/ebooking/appointments-contact/${patientId}/${appointmentId}/confirm`, params, { headers }).pipe(
      map(resp => {
        return resp
      })
    )
  }


}