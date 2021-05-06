// import { Component, OnInit } from '@angular/core';
// import { RegisterService } from '../register.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-validate-email',
//   templateUrl: './validate-email.component.html'
// })
// export class ValidateEmailComponent implements OnInit {

//   public data: any;
//   public date1: string = '';
//   public date2: string = '';
//   public date3: string = '';
//   public date4: string = '';
//   public codeValidate: any = '';

//   public sucess: boolean = false;

//   constructor(private registerService: RegisterService, private Router: Router) { }

//   ngOnInit() {
//     this.data = this.registerService.data;
//   }


// val(){

//   if(this.date1.length && this.date2.length && this.date3.length && this.date4.length){
//     return false
//   }else {
//   return true
//   }

// }

//   sendResssgister(){

//     this.codeValidate = this.date1 + this.date2 + this.date3 + this.date4;

//     this.registerService.registerNewUser(this.codeValidate)

//     .subscribe((data:any) =>{

//       console.log(data.status)
      
//     }, error =>{
//       if(error.error.status === 400){
//         this.date1 = '';
//         this.date2 = '';
//         this.date3 = '';
//         this.date4 = '';
//       }
//       console.log(error.error.status)
//     })
//   }

// }
