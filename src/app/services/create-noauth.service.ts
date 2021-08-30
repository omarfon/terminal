import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';


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

  urlBase = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/api/v2/ebooking/appointments/createNoAutho/"

  constructor(public http: HttpClient) { }


  createAppoitmentNoAutho(idPatient) {
    this.dataJson.provisions = [{ "default": false, "id": 44 }];
    let params = {listJson:this.dataJson, patientId:idPatient};
    let headers = {};
    return this.http
      .post(this.urlBase , params, {headers}) ;
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

}
