import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/animation';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-avivacuida',
  templateUrl: './avivacuida.component.html',
  styleUrls: ['./avivacuida.component.scss'],
  animations: [fadeIn]
})
export class AvivacuidaComponent implements OnInit {

  public dataSpecialty: any;
  public preloader: boolean;
  public color: any = 'warn';
  public mode: any = 'indeterminate';
  urlBaseAlter;
  

  progressPage = {
    page : 'avivaCuida',
    state :  'especialidad',
    pageDoctor : false
  }


  constructor(private auth: AuthService,
              private reservasService : ReservasService,
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

      this.dataSpecialty = data.centers[0].services.filter((element) =>{
        return element.block === 'cuida';
      })

      this.dataSpecialty.forEach(element => {

        element.trackingId = this.eliminarDiacriticos(element.description);
        element.trackingId = element.trackingId.split(" ").join("-");
        element.trackingId = element.trackingId.toLowerCase()
         
       });

   

    }, (error: any) => {
 
    })
    
  }


  eliminarDiacriticos(texto){
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

doctoresPage(data){
  console.log(data);
  this.reservasService.especialidad = data;
  this.router.navigate(['doctores']);
}


}
