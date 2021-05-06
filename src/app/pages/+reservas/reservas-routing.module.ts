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
  /* {
    path: 'avivacura',
    component: ReservasComponent,
    loadChildren: () => import('src/app/+reservas/avivacura/aviva-cura.module').then(m => m.AvivaCuraModule)

  }, */
/*   {
    path: 'avivatele',
    component: ReservasComponent,
    children: [{
      path: '', component: AvivateleComponent
    }]
  }, */
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
  /* {
    path: 'avivacuida/valida-codigo',
    canActivate: [desactivateUser],
    component: ReservasComponent,
    children: [{
      path: '', component: ValidateCodeComponent
    }
    ]
  }, */
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
    canActivate: [UserGuard],
    component: ReservasComponent,
    children: [{
      path: '', component: SeguroComponent
    }
    ]
  },
  {
    path: 'avivacuida/pago',
    canActivate: [UserGuard],
    component: ReservasComponent,
    children: [{
      path: '', component: PagoComponent
    }
    ]
  },
  {
    path: 'pago',
    canActivate: [UserGuard],
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
