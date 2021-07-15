import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutReservasComponent } from './layouts/app-layout-reservas/app-layout-reservas.component';
import { HomeComponent } from './pages/home/home.component';
import { PediatriaComponent } from './pages/pediatria/pediatria.component';
import { ReservaComponent } from './pages/+reservas/reserva/reserva.component';
import { AvivacuraComponent } from './pages/+reservas/avivacura/avivacura.component';




const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'pediatria',
    component:PediatriaComponent
  },
  {
    path:'reserva',
    component:ReservaComponent
  },
  {
    path:'cura',
    component:AvivacuraComponent
  },
  {
    path: 'reservas',
    component: AppLayoutReservasComponent,
    loadChildren: () => import('src/app/pages/+reservas/reserva.module').then(m => m.ReservaModule)
  },
];


export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: true });
