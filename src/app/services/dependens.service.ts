import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReservasService } from '../pages/+reservas/reservas.service';

@Injectable({
  providedIn: 'root'
})
export class DependensService {
  private SERVER = environment.url + `api/v2/`;
  private apiUrl = `${this.SERVER}users/dependents`;
  private apiDelete = `${this.SERVER}users/removecontact?userId=`;
  private apiDatesParents = `${this.SERVER}ebooking/citas-paciente-contactos`;
  private apiOldDates = `${this.SERVER}ebooking/encuentrosPaciente`;
  private apiDatesParentsv2 = `${this.SERVER}/ebooking/encuentros-paciente-contacto`;

  public headers;
  public dependens;
  public patientId;
  constructor(public http: HttpClient, public reservaSrv: ReservasService) { 
    const session = JSON.parse(localStorage.getItem('session'));
    this.headers = new HttpHeaders({ "Authorization": session.authorization });
    this.getDependens();
  }

  getDependens() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http.get(this.apiUrl, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }

  // con esta llamada estamos trayendo las citas de todos los dependientes
  getdependesDay() {
    let headers = this.headers
    return this.http.get(this.apiDatesParents, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }

   // con esta llamada estamos trayendo las citas de todos los dependientes
   getdependesNoAutho() {

    return this.http.get(this.SERVER + `users/dependentsNoAutho/` + this.patientId).pipe(
      map(data => {
        return data;
      })
    )
  }

  getDependentDay(id) {
    let headers = this.headers
    return this.http.get(this.apiDatesParentsv2 + `/${id}`, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }

  // con esta llamada se esta trayendo las citas pasadas del usuario validado
  getOldDependetsDay() {
    let headers = this.headers
    return this.http.get(this.apiOldDates, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }

  // con esta llamada estamos eliminando de mi lista a los dependientes...
  deleteDepend(id) {
    let headers = this.headers
    return this.http.delete(this.apiDelete + `${id}`, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }
}
