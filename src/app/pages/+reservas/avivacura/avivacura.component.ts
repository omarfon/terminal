import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { fadeIn } from 'src/app/shared/animations/animation';
import { ReservasService } from '../reservas.service';


@Component({
  selector: 'app-avivacura',
  templateUrl: './avivacura.component.html',
  styleUrls: ['./avivacura.component.scss'],
  animations: [fadeIn]
})
export class AvivacuraComponent implements OnInit {

  public dataSpecialty: any;
  public preloader: boolean;
  public color: any = 'warn';
  public mode: any = 'indeterminate';
  urlBaseAlter;
  public dataSpecialtyCuida;
  public dataSpecialtyCura;
  

  progressPage = {
    page : 'avivaCura',
    state :  'especialidad',
    pageDoctor : false
  }

  public space = '-';
  public patron = " ";
  
  constructor(private auth: AuthService,
              private reservasService: ReservasService,
              public router: Router) { }

  ngOnInit() {
    this.urlBaseAlter = this.auth.urlBaseAlter;
    this.preloader = true;
    //- STATE BAR PROGRESS
    this.reservasService.progressPage.next(this.progressPage);

    //- DATA SERVICE SPECIALTY
    
    this.reservasService.getSpecialty()
    .subscribe((data: any) => {
      if(data){ this.preloader = false}
      this.dataSpecialtyCuida = data.centers[0].services.filter((element) =>{
        return element.block == 'cuida';
      })

      this.dataSpecialtyCura = data.centers[0].services.filter((element) =>{
        return element.block == 'cura';
      })
     /*  this.dataSpecialty.forEach(element => {
        element.trackingId = this.eliminarDiacriticos(element.description);
        element.trackingId = element.trackingId.split(" ").join("-");
        element.trackingId = element.trackingId.toLowerCase()
        
       }); */
    }, (error: any) => {
 
    })
  }

  eliminarDiacriticos(texto){
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

doctoresPage(data){
  console.log(data);
  this.reservasService.especialidad = data;
  this.router.navigate(['doctores-cura']);
}

}
