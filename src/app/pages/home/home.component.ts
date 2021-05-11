import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { GinecopediaComponent } from 'src/app/modals/ginecopedia/ginecopedia.component';
import { PartoComponent } from 'src/app/modals/parto/parto.component';
import { AuthService } from 'src/app/services/auth.service';
import { MamappComponent } from '../mamapp/mamapp.component';
import { WawappComponent } from '../wawapp/wawapp.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'terminal';
  value = "";
  constructor(public dialog: MatDialog,
              public authSrv: AuthService,
              public router: Router) { }

  ngOnInit() {
    this.authSrv.getSesionPublic();
  }


  openModalMamapp(){
    const dialogmama = this.dialog.open(MamappComponent);

    dialogmama.afterClosed().subscribe(result => {
      console.log('dialogo mama cerrado');
    });

    }

    openModalWawapp(){
      const dialogwawa = this.dialog.open(WawappComponent);
  
      dialogwawa.afterClosed().subscribe(result => {
        console.log('dialogo wawapp cerrado');
      });
  
      }

      openGiencoPediatri(){
       /*  const dialoggineco = this.dialog.open(GinecopediaComponent);
  
        dialoggineco.afterClosed().subscribe(result => {
          console.log('dialogo mama cerrado');
        }); */
        this.router.navigate(['reserva']);
      }
      goToHome(){
        this.router.navigate(['/']);
      }

      openParto(){
        const dialogParto = this.dialog.open(PartoComponent);
        dialogParto.afterClosed().subscribe(result => {
          console.log('dialog parto cerrado')
        })
      }

}
