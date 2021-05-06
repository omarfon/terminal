import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutReservasComponent } from './layouts/app-layout-reservas/app-layout-reservas.component';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { HomeComponent } from './pages/home/home.component';
import { PediatriaComponent } from './pages/pediatria/pediatria.component';
import { ReservaComponent } from './pages/+reservas/reserva/reserva.component';
import { MamappVideoComponent } from './pages/mamapp-video/mamapp-video.component';
import { WawappVideoComponent } from './pages/wawapp-video/wawapp-video.component';



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
    path:'beneficios',
    component:BeneficiosComponent
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
    path:'mamapp-video',
    component:MamappVideoComponent
  },
  {
    path:'wawapp-video',
    component:WawappVideoComponent
  },
  {
    path: 'reservas',
    component: AppLayoutReservasComponent,
    loadChildren: () => import('src/app/pages/+reservas/reserva.module').then(m => m.ReservaModule)
  },
];


export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: true });
