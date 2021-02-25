import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loggenIn: boolean;

  constructor(public dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '230px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.loggenIn = result;
    });
  }

  logout() {
    this.accountService.logout();
   this.loggenIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.loggenIn = !!user;
    }, error => {
      console.log(error)
    })
  }


}
