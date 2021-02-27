import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor(public dialog: MatDialog, public accountService: AccountService) { }

  ngOnInit() {

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '230px',
      autoFocus: false
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '230px',
      autoFocus: false
    });
  }

  logout() {
    this.accountService.logout();
  }
}
