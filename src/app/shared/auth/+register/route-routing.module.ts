import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component'

//IMPORT LAYOUTS
import { AppLayoutReservasComponent } from 'src/app/layouts/app-layout-reservas/app-layout-reservas.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
