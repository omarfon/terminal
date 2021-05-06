import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera-interna',
  templateUrl: './cabecera-interna.component.html',
  styleUrls: ['./cabecera-interna.component.scss']
})
export class CabeceraInternaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['home']);
  }

}
