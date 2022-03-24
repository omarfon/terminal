import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;

  urlBaseAlter = environment.urlBaseAlter;

  urlApiNodos = environment.urlApiNodos;

  apiKeyCulqi = environment.apiKeyCulqi;

  public idRecovery: any;
  public emailRecovery: any;
  private _token: string;
  private _user: string;
  private _role: any;
  public _sessionObs: Subject<any> = new Subject;

  public _stateNavPlanes: Subject<any> = new Subject;

  public _stateNavPlanes2: Subject<any> = new Subject;

  public _positionPage: Subject<any> = new Subject;



  get stateNav() {
    return this._stateNavPlanes;
  }

  get stateNav2() {
    return this._stateNavPlanes2;
  }
  get progressPage() {
    return this._sessionObs;
  }
  // GET TOKEN FROM STORAGE
  get token(): string {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.authorization) {
      this._token = session.authorization;
      return this._token;
    } else {
      return null;
    }
  }

  // GET USER FROM STORAGE
  get user(): string {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.name) {
      this._user = session.name;
      return session.name;
    } else {
      return null;
    }
  }

  // GET ROLE FROM STORAGE
  get role(): any {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.role) {
      this._role = session.role;
      return session.role;
    } else {
      return null;
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  // GET INFORMATION CONTACT AVIVA

  getInfoContact() {
    return this.http
      .get(this.urlApiNodos + 'site-information');
  }

  // GET INFORMATION ABOUT AVIVA
  getAboutAviva() {
    return this.http
      .get(this.urlApiNodos + 'about');
  }

  //RETURN URL
  getUrlBase() {
    if (this.url) {
      return this.url
    }
  }

  // GET URL BASE V2
  getUrlBaseAlter() {
    if (this.urlBaseAlter) {
      return this.urlBaseAlter
    }
  }

  // GET URL BASE NODOS
  getUrlBaseNodos() {
    if (this.url) {
      return this.urlApiNodos
    }
  }

  isUser() {
    return this.role;
  }

  User() {
    return this.user;
  }

  //AUTHORIZATIONHEADER
  getAuthorizationHeader() {
    return this.token;
  }

  //AUTHENTICATED
  showTokenAndUser() {

    if (this.user != '' && this.token != '') {
      return true
    } else {
      return false
    }
  }
  isAuthenticated() {

    return this.user && this.token
  }

  //GET SESSION PUBLIC
  getSesionPublic() {
    return this.http.get(this.url + 'api/v2/users/public-authorization')
    .subscribe((data) => {
      localStorage.setItem('session', JSON.stringify(data));
      const local = JSON.parse(localStorage.getItem('session'));
      const autho = local.authorization;
      localStorage.setItem('publicAutho', autho);
    }, error => {
      console.log(error);
    })
    
  }

  deleteCita(id) {
    return this.http
      .delete(this.url + 'api/v2/ebooking/appointments/' + id)
  }

  // OBTENER DATOS DEL USUARIO
  getDatosUsers() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.url + 'api/v2/ebooking/datos-paciente', {headers});
  }

  // OBTENER DATOS DE CITA DEL USUARIO
  getCitasUser() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.url + 'api/v2/ebooking/citas-paciente?minutos=60', { headers });
  }

  getdependesDay() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    return this.http.get(this.url + `api/v2/ebooking/citas-paciente-contactos`, { headers }).pipe(
      map(data => {
        return data;
      })
    )
  }


  // VALIDATE CODE
  validateEmail(data) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    return this.http
      .post(this.url + 'api/v2/users/validate-email/recovery', data, {headers})
  }


  // SEND CODE PASSWORD RECOVERY
  sendCodeRecovery(data) {
    return this.http
      .post(this.url + 'api/v2/users/login-recovery', data)
  }

  getPastAppoiments() {
    return this.http
      .get(this.url + 'api/v2/ebooking/encuentros-paciente')
  }

  updateSession() {
    const data = {
      token: this._token,
      user: this._user,
      role: this._role
    };
    localStorage.setItem('session', JSON.stringify(data));
  }

  getTermOfService() {
    return this.http
      .get(this.urlApiNodos + 'site-information');
  }

  //GET SESSION USER PRIVATE
  
  getSessionUserPrivate(urls: string, email: string, password: string, app: string) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });

    const loginObs: Subject<any> = new Subject();
    this.http.post(this.url + urls, { email, password, app }, {headers})
      .subscribe(data => {
        localStorage.setItem('session', JSON.stringify(data));
        loginObs.next(data);
        this._sessionObs.next(data);
      }, error => {
        loginObs.next(error.error);
      })
    return loginObs;
  }

  //REMOVED SESSION
  logout() {
    this._token = null;
    this._user = null;
    localStorage.removeItem('session');
    return true;
  }
}
