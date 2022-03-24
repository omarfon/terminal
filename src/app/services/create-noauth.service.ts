import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CreateNoauthService {

  public dataJson: any = [];
  public provisionsId;
  public prestacion;
  public dateCita;
  public parent;
  public parentId;
  public parentIdCreate;
  private SERVER = environment.url + `api/v2/`;

  urlBase = `${this.SERVER}ebooking/appointments/createNoAutho/`;
  urlBaseParent = `${this.SERVER}ebooking/appointments/createforuserNoAutho/`
  urlDatos = `${this.SERVER}ebooking/datos-pacienteNoAutho?patientId=`;

  constructor(public http: HttpClient) { }


  createAppoitmentNoAutho(idPatient) {
    this.dataJson.provisions = [{ "default": false, "id": this.dataJson.provisions }];
    
    let params = {listJson:this.dataJson};
    return this.http
      .post(this.urlBase + idPatient , params).pipe(
        map(resp => {
          return resp
        })
      ) ;
  }

  createParentNoAutho(){
    this.dataJson.provisions = [{ "default": false, "id": this.dataJson.provisions }];
    let params = {listJson:this.dataJson};
    return this.http
      .post(this.urlBaseParent + this.parentIdCreate , params).pipe(
        map(resp => {
          return resp
        })
      ) ;
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

  getDataPatient(id){
    return this.http.get(this.urlDatos + id ).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

}
