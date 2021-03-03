import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor(public dialog: MatDialog, public accountService: AccountService, private notification: NotificationService, private router: Router) { }

  ngOnInit() {

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
      autoFocus: false
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px',
      autoFocus: false
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.notification.success('logout successful');
  }
}
