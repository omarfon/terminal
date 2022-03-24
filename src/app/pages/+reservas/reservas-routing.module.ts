import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservasComponent } from './reservas.component';
import { ReservasComponentContent } from './reservas-contet/reservas-content.component'
import { DoctoresComponent } from './doctores/doctores.component';
import { RegistroCitaComponent } from './registro/registro-cita.component';
import { SeguroComponent } from './seguro/seguro.component';
import { PagoComponent } from './pago/pago.component';
import { AvivacuidaComponent } from './avivacuida/avivacuida.component';
import { UserGuard } from 'src/app/shared/auth/guard/user.guard';
import { desactivateUser } from 'src/app/shared/auth/guard/desactiva.guard';
import { CabeceraComponent } from 'src/app/shared/cabecera/cabecera.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaFinalizadaComponent } from './reserva-finalizada/reserva-finalizada.component';
import { AvivacuraComponent } from './avivacura/avivacura.component';
import { ReservaCuraComponent } from './reserva-cura/reserva-cura.component';
import { DoctoresCuraComponent } from './doctores-cura/doctores-cura.component';
import { RegistroCuraComponent } from './registro-cura/registro-cura.component';
import { SeguroCuraComponent } from './seguro-cura/seguro-cura.component';




const routes: Routes = [
  {
    path: 'reservas',
    component: ReservasComponent,
    children: [{
      path: '', component: ReservasComponentContent
    }]
  },
  {
    path: 'reserva',
    component: ReservasComponent,
    children: [{
      path: '', component: ReservaComponent
    }]
  },
  {
    path:'cura',
    component: ReservaCuraComponent,
    children: [{
      path: '', component: AvivacuraComponent
    }]
  },
  {
    path: 'avivacuida/selecciona-doctor/:id/:description',
    component: ReservasComponent,
    children: [{
      path: '', component: DoctoresComponent
    }
    ]
  },
  {
    path: 'doctores',
    component: ReservasComponent,
    children: [{
      path: '', component: DoctoresComponent
    }
    ]
  },
  {
    path: 'doctores-cura',
    component: ReservasComponent,
    children: [{
      path: '', component: DoctoresCuraComponent
    }
    ]
  },
  {
    path: 'avivacuida/registro',
    canActivate: [desactivateUser],
    component: ReservasComponent,
    children: [{
      path: '', component: RegistroCitaComponent
    }
    ]
  },
  {
    path: 'registro',
    canActivate: [desactivateUser],
    component: ReservasComponent,
    children: [{
      path: '', component: RegistroCitaComponent
    }
    ]
  },
  {
    path: 'registro-cura',
    component: ReservasComponent,
    children: [{
      path: '', component: RegistroCuraComponent
    }
    ]
  },
  {
    path: 'avivacuida/seguro',
    canActivate: [UserGuard],
    component: ReservasComponent,
    children: [{
      path: '', component: SeguroComponent
    }
    ]
  },
  {
    path: 'seguro',
    component: ReservasComponent,
    children: [{
      path: '', component: SeguroComponent
    }
    ]
  },
  {
    path: 'seguro-cura',
    component: ReservasComponent,
    children: [{
      path: '', component: SeguroCuraComponent
    }
    ]
  },
  {
    path: 'avivacuida/pago',
    component: ReservasComponent,
    children: [{
      path: '', component: PagoComponent
    }
    ]
  },
  {
    path: 'pago',
    component: ReservasComponent,
    children: [{
      path: '', component: PagoComponent
    }
    ]
  },
  {
    path: 'reserva-finalizada',
    component: ReservasComponent,
    children: [{
      path: '', component: ReservaFinalizadaComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
