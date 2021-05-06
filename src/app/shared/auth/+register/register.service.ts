import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private Authservice: AuthService, private http: HttpClient) { }

  urlBase = this.Authservice.getUrlBase();

  public data: any;

  // GET GENDERS

  userGenders() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.urlBase + 'api/v2/users/genders', {headers});
  }

  // GET TYPE DOCUMENTS

  userDocuments() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.urlBase + 'api/v2/users/documenttypes', {headers});
  }

  // GET RELATIONS
  userRelations() {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .get(this.urlBase + 'api/v2/users/relations', {headers});
  }
  // GET CODE WITH EMAIL

  sendCode(email: string) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    return this.http
      .post(this.urlBase + 'api/v2/users/validateemail/register', {
        "email": email
      }, {headers});
  }

  // REGISTER NEW USER WITH CODE

  registerNewUser(codeValida: any) {
    const session = JSON.parse(localStorage.getItem('session'));
    let headers = new HttpHeaders({ "Authorization": session.authorization });
    console.log(this.data, codeValida)
    
    return this.http
      .post(this.urlBase + 'api/v2/users/register', {
        "email": this.data.email,
        "password": this.data.password,
        "name": this.data.name,
        "surname1": this.data.surname1,
        "surname2": this.data.surname2,
        "birthdate": this.data.birthdate,
        "gender": {
          "id": this.data.gender.id,
          "name": this.data.gender.name,
        },
        "documentType": {
          "id": this.data.documentType.id,
          "name": this.data.documentType.name
        },
        "documentNumber": this.data.documentNumber,
        "phone": this.data.phone,
        "code": codeValida,
        "id": this.data.id
      }, {headers});
  }


}
