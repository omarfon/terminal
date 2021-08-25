import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataPacienteService {

  private url = environment.url;
  private urlDocument = this.url + 'api/v2/users/getPatientByDocument/';
  private reniec = 'https://apiperu.dev/api/dni/';

  constructor(public http: HttpClient) { }


  getDataXhis(type:number, dni:number){
    return this.http.get(this.urlDocument + `${type}/${dni}`).pipe(
      map( res => {
        return res
      })
    )
  }

  getTypesDocument(dni:string){
      return this.http.get(this.reniec + `${dni}`).pipe(
        map( res => {
          return res
        })
      )
  }

  getPublicKey(dni:string){
    const auth_token = '30dcd655149906b1469ac3913125f30862b0ab1b4bc0425f8256166d98a82d02';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.reniec + `${dni}`, { headers: headers })
  }
  


}
