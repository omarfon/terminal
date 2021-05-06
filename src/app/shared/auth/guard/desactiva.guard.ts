import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class desactivateUser implements CanActivate {

  constructor(private routes: Router, private authService: AuthService ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if(this.authService.isUser() === 'public'){
      return true;
    }else{
        this.routes.navigate(['/404']);
      return false;
    }
    
      
    }
}