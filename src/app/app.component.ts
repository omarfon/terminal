import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GinecopediaComponent } from './modals/ginecopedia/ginecopedia.component';
import { MamappComponent } from './pages/mamapp/mamapp.component';
import { WawappComponent } from './pages/wawapp/wawapp.component';
import { PartoComponent } from './modals/parto/parto.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
  "../../node_modules/simple-keyboard/build/css/index.css",
  './app.component.scss']
})
export class AppComponent {
  title = 'terminal';
  value = "";
    constructor(public dialog: MatDialog,
                public router: Router){
      
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
        const dialoggineco = this.dialog.open(GinecopediaComponent);
  
        dialoggineco.afterClosed().subscribe(result => {
          console.log('dialogo mama cerrado');
        });
    
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

