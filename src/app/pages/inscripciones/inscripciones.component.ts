import { Component, OnInit } from '@angular/core';
import { BeneficesService } from 'src/app/services/benefices.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  public insctritos;
  constructor(public beneficiosSrv: BeneficesService) { }

  ngOnInit() {
    this.getAllBeneficios();
  }

  getAllBeneficios(){
    this.beneficiosSrv.getAllData().subscribe((data:any) =>{
      const inscritos = data.map(d => {
        return {
          id: d.payload.doc.id,
          data : d.payload.doc.data()['data'],
          status : d.payload.doc.data()['status']
        }
      })
      this.insctritos = inscritos;
      console.log(this.insctritos);
    })
  }

  actualizar(item, ingre){
    console.log(item, ingre);
    const c = item.id;
    /* const status = item.data.status; */
    this.beneficiosSrv.changueStatus(c, ingre).then(data => {
      console.log(data)
    })
  }

}
