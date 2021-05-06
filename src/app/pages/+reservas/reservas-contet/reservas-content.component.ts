import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reservas-content',
  templateUrl: './reservas-content.component.html'
})
export class ReservasComponentContent implements OnInit  {

  public dataSpecialty: any;
  public progress = 15;

  constructor(private reservasService : ReservasService) {
  }

  ngOnInit() {
    this.reservasService.progressObs.next(this.progress);
  }

}
