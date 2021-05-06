import { Component, OnInit } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { RecoveryComponent } from 'src/app/modals/recovery/recovery.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-interno',
  templateUrl: './nav-interno.component.html',
  styleUrls: ['./nav-interno.component.scss']
})
export class NavInternoComponent implements OnInit {
  public show: boolean = false;
  addClassMenu: any;
  public role: string;
  user;
  constructor(iconRegistry: MatIconRegistry, private AuthService: AuthService, private router: Router, sanitizer: DomSanitizer, public dialog: MatDialog) { 
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/telef.svg'));
  }

  ngOnInit() {
  }

  showSubMenu() {
    this.show = !this.show;
  }
  isUser() {
    if (this.AuthService.isUser() === 'user') {
      this.user = this.AuthService.User();
      return true
    } else {
      return false
    }
  }

  logout() {
    if (this.AuthService.logout()) {
      this.AuthService.getSesionPublic();
      this.router.navigate(['/'])
    } else {
    }
  }
  logout2() {
    if (this.AuthService.logout()) {
      this.router.navigate(['/'])
      this.AuthService.getSesionPublic();
    } else {
    }
  }

  changeStateMenu() {
    if (this.addClassMenu === 'activo') {
      this.addClassMenu = '';

    } else {
      this.addClassMenu = 'activo';
    }
  }
  // OPEN MODAL LOGIN


  // OPEN MODAL LOGIN
  openLogin(): void {
    const diallogRef = this.dialog.open(ModalComponent, {
      data: 'home',
      width: '97%',
      maxWidth: '641px',
      panelClass: ['login-pop-up']
    });
    diallogRef.afterClosed().subscribe(res => {

    })
  }

  openModalChange() {
    this.dialog.open(RecoveryComponent);
  }

}
