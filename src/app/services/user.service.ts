import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://dni.optimizeperu.com/api/prod/persons/";

  constructor(public http: HttpClient) { }


  getDatosUser(doc){
    let headers = new HttpHeaders({ "authorization": "token f01fe7b8eb2705af4b1ab1ed74b99c8ab65625d2" });
    return this.http.get(this.url + doc , {headers}).pipe(
      map(data => {return data})
    )
  }
}
