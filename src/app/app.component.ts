import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GinecopediaComponent } from './modals/ginecopedia/ginecopedia.component';
import { MamappComponent } from './pages/mamapp/mamapp.component';
import { WawappComponent } from './pages/wawapp/wawapp.component';
import Keyboard from "simple-keyboard";
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
  keyboard: Keyboard;
    constructor(public dialog: MatDialog,
                public router: Router){
      
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

