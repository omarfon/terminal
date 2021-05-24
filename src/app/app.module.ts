import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { MamappComponent } from './pages/mamapp/mamapp.component';
import { WawappComponent } from './pages/wawapp/wawapp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { GinecopediaComponent } from './modals/ginecopedia/ginecopedia.component';
import {MatIconModule} from '@angular/material/icon';
import { PartoComponent } from './modals/parto/parto.component';
import { GinecoComponent } from './pages/gineco/gineco.component';
import { PediatriaComponent } from './pages/pediatria/pediatria.component';
import { HomeComponent } from './pages/home/home.component';
import { CabeceraComponent } from './shared/cabecera/cabecera.component';
import { RegistroComponent } from './pages/+reservas/registro/registro.component';
import { EspecialidadesComponent } from './pages/+reservas/especialidades/especialidades.component';
import { AppLayoutReservasComponent } from './layouts/app-layout-reservas/app-layout-reservas.component';
import { NavInternoComponent } from './shared/+nav/nav-interno/nav-interno.component';
import { RecoveryComponent } from './modals/recovery/recovery.component';

import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { ReservaModule } from './pages/+reservas/reserva.module';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthGuard } from './shared/auth/guard/auth.guard';
import { UserGuard } from './shared/auth/guard/user.guard';
import { desactivateUser } from './shared/auth/guard/desactiva.guard';
import { FormsModule } from '@angular/forms';
import { ErrorPaymentComponent } from './shared/modal/error-payment/error-payment.component';
import { MamappVideoComponent } from './pages/mamapp-video/mamapp-video.component';
import { WawappVideoComponent } from './pages/wawapp-video/wawapp-video.component';
import { InfoFormuComponent } from './shared/modal/info-formu/info-formu.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AgradecimientoComponent } from './modals/agradecimiento/agradecimiento.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import {MatMenuModule} from '@angular/material/menu';
export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {

  direction: 'horizontal',
  slidesPerView: 3,
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    clickable: true,
    el: '.swiper-pagination',
    type: 'bullets',
    hideOnClick: false
  },
  spaceBetween: 50,
  breakpoints: {

    // when window width is <= 640px
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    }
  }
};

const GUARDS_APLICATION = [
  AuthGuard,
  UserGuard,
  desactivateUser
];
@NgModule({
  declarations: [
    AppComponent,
    MamappComponent,
    WawappComponent,
    GinecopediaComponent,
    PartoComponent,
    GinecoComponent,
    PediatriaComponent,
    HomeComponent,
    CabeceraComponent,
    RegistroComponent,
    EspecialidadesComponent,
    AppLayoutReservasComponent,
    NavInternoComponent,
    RecoveryComponent,
    ErrorPaymentComponent,
    MamappVideoComponent,
    WawappVideoComponent,
    InfoFormuComponent,
    AgradecimientoComponent,
    InscripcionesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReservaModule,
    SwiperModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent],
  entryComponents: [MamappComponent, WawappComponent, GinecopediaComponent, PartoComponent, InfoFormuComponent, AgradecimientoComponent]
})
export class AppModule { }
