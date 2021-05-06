import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['home']);
  }

}
