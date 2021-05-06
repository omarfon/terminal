import { Component, OnInit, OnDestroy ,EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { ReservasService } from './reservas.service';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { fadeIn } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  animations:[fadeIn]
})

export class ReservasComponent implements OnInit, OnDestroy {
  avivaCuida: boolean = false;
  page = 'reservas';
  pageInternas;
  doctors: boolean = false;
  registro: boolean = false;
  seguro: boolean = false;
  pago;

  constructor(
    private reservasService: ReservasService,
    private cdRef: ChangeDetectorRef,
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    document.querySelectorAll('body')[0].classList.add('nav-movil-none');
    this.reservasService.progressPage.subscribe((page) => {
      this.pageInternas = page.state;
      this.doctors = page.pageDoctor;
      this.registro = page.pageRegistro;
      this.seguro = page.pageSeguro;
      this.page = page.page;
      
      if (!this.cdRef['destroyed']) {
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnDestroy(){
    document.querySelectorAll('body')[0].classList.remove('nav-movil-none');
  }

  backLink(){
    window.history.back();
  }

  userNoAutenticate(){
    const session = JSON.parse(localStorage.getItem('session'));
    if(session.role){
      if(session.role === 'user'){
        return false;
      }else{
        return true;
      }
    }
  }
}
