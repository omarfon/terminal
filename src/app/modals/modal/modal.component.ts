import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal.component.html',
  styleUrls: ['../../../../node_modules/simple-keyboard/build/css/index.css',
          './modal.component.scss']
})
export class ModalComponent implements OnInit {
  keyboard: Keyboard;
  value = " ";

  public recoverPassword: boolean = false;
  public logins: boolean = false;
  public email: string = '';
  public emailValidate: boolean;
  public password: string = '';
  public passValidate: boolean;
  public validatePasss: boolean;
  public preloader: boolean = false;
  public validate: boolean = false;
  public readyValidate: boolean = false;
  public showRegister: boolean = false;

  public loaderSession: boolean = false;
  public mode: string = 'indeterminate';
  public url: string = 'api/v2/users/login';
  public app = 'ebooking';
  color;

  public serviceError: boolean;
  // EXPRESIONS REGULAR
  public ER_NUM = /^([0-9])*$/;
  public ER_STR: any = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  public ER_STR_MA: any = /[A-Z]/;
  public ER_EMA = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

  constructor(public dialogRed: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public AuthService: AuthService, public router: Router) { }

  ngOnInit() {
    this.logins = true;


    if (this.message === 'aviva-cuida') {

      document.querySelectorAll('body')[0].classList.add('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
    } else if (this.message === 'home' || this.message === 'reserva-doctor') {
      document.querySelectorAll('body')[0].classList.remove('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.add('aviva-home');
    } else if (this.message === 'aviva-cura') {
      document.querySelectorAll('body')[0].classList.add('aviva-cura-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-cuida-modal');
      document.querySelectorAll('body')[0].classList.remove('aviva-home');
    }
  }

  onClickNo() {
    this.dialogRed.close();
  }

  // VALIDATE EMAIL KEYUP && BLUR
  onkeyBlurEmail() {
    if (this.email.length > 1) {
      this.readyValidate = true;
      this.onkeyEmail();
    }
  }
  onkeyEmail() {
    this.serviceError = false;
    if (this.readyValidate) {
      if (this.validateInput(this.ER_EMA, this.email)) {
        this.emailValidate = true;
      } else {
        this.emailValidate = false;
      }
    }
  }

  // VALIDATE PASSWORD KEYUP && BLUR
  onkeyPass() {
    this.serviceError = false;
    this.validateInputSim(this.password)

  }

  // VALIDATE SIMPLE
  validateInputSim(input: any) {
    if (input.length > 3) {
      this.validatePasss = true;
      this.passValidate = true;
    } else {
      this.passValidate = false;
    }
  }

  // VALIDATE INPUTS EXPRESIONES REGULARES
  validateInput(expresion: any, input: string): boolean {
    this.validate = true;
    if (expresion.test(input)) {
      return true;
    } else {
      this.emailValidate = false;
      return false;
    }
  }

  ValidateInputs(): boolean {
    if (this.emailValidate && this.passValidate) {
      return false;
    } else {
      return true;
    }
  }


  // LOGIN
  login(event: any) {
    event.preventDefault();
    this.loaderSession = true;
    this.AuthService.getSessionUserPrivate(this.url, this.email, this.password, this.app)
      .subscribe(data => {

        if (data.patientName) {
          this.loaderSession = false;
          if (this.AuthService.isUser() === 'user') {
            if(this.message === 'aviva-cuida'){
              this.router.navigate(['seguro']);
            }else if(this.message === 'aviva-cura'){
              this.router.navigate(['seguro-cura']);
            }
            this.dialogRed.close();
          }
        } else {
          if (data.status === 401) {
            this.loaderSession = false;
            this.serviceError = true;
            this.emailValidate = false;
            this.passValidate = false;
            this.email = '';
            this.password = '';
            console.log('hubo un error de autenticacion')
          }
        }
      },
        (error) => {
          console.log(error)
        });
  }

  sendRecover() {
    this.loaderSession = true;
    const dataSend = {
      email: this.email
    }
    this.AuthService.validateEmail(dataSend).subscribe((data: any) => {
      if (data.result === 'ok') {
        this.loaderSession = false;
        this.AuthService.idRecovery = data.id
        this.AuthService.emailRecovery = this.email
        this.router.navigate(['/recuperar-contraseña', this.message]);
        this.onClickNo();
      }
      console.log(data.result)
    }, (error: any) => {
      if (error.error.result === 'error') {
        this.email = '';
        this.emailValidate = false;
        this.serviceError = true;
        this.loaderSession = false;
      }
      console.log(error.error.result)
    })
    // this.router.navigate(['/recuperar-contraseña']);
    // this. onClickNo();
    console.log(this.email)
  }

  showModalRegister() {
    this.showRegister = true;
    this.logins = false;
  }

  showRecovPass() {
    this.recoverPassword = true;
    this.logins = false;
  }

}
