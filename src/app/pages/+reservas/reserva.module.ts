import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasRoutingModule } from './reservas-routing.module';
import { DoctoresComponent } from './doctores/doctores.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeguroComponent } from './seguro/seguro.component';
import { PagoComponent } from './pago/pago.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReservasComponent } from './reservas.component';
import { MatCheckbox, MatCheckboxModule, MatIcon, MatIconModule, MatRadioModule } from '@angular/material';
import { AvivacuidaComponent } from './avivacuida/avivacuida.component';
import { ReservasComponentContent } from './reservas-contet/reservas-content.component';
import { RegistroCitaComponent } from './registro/registro-cita.component';
import { ReservaComponent } from './reserva/reserva.component';
import { RegisterModalComponent } from 'src/app/shared/register-modal/register-modal.component';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { ButtonPayComponent } from 'src/app/shared/utils/button-pay/button-pay.component';
import { CabeceraInternaComponent } from 'src/app/shared/cabecera-interna/cabecera-interna.component';
import { ReservaFinalizadaComponent } from './reserva-finalizada/reserva-finalizada.component';
import { AlertComponent } from 'src/app/shared/modal/alert/alert.component';
import { CreateParentComponent } from 'src/app/shared/modal/create-parent/create-parent.component';



@NgModule({
  declarations: [
    ReservasComponent,
    ReservasComponent,
    AvivacuidaComponent,
    ReservasComponentContent,
    DoctoresComponent,
   RegistroCitaComponent, 
    SeguroComponent,
    PagoComponent,
  ReservaComponent,
  RegisterModalComponent,
  ModalComponent,
  ButtonPayComponent,
  CabeceraInternaComponent,
  ReservaFinalizadaComponent,
  AlertComponent,
  CreateParentComponent,
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [
    ReservasComponent,
    AvivacuidaComponent,
    ReservasComponent,
    ReservasComponentContent,
    DoctoresComponent,
   RegistroCitaComponent,
    SeguroComponent,
    PagoComponent,
    ReservaComponent,
    ButtonPayComponent,
    CabeceraInternaComponent,
    ReservaFinalizadaComponent,
    CreateParentComponent
  ],
  entryComponents:[
    RegisterModalComponent,
    ModalComponent,
    AlertComponent,
    CreateParentComponent,
  ],
  providers:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReservaModule { }
