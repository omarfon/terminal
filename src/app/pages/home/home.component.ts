import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import Keyboard from "simple-keyboard";
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
  keyboard: Keyboard;
  constructor(public dialog: MatDialog,
              public authSrv: AuthService,
              public router: Router) { }

  ngOnInit() {
    this.authSrv.getSesionPublic();
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };


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
