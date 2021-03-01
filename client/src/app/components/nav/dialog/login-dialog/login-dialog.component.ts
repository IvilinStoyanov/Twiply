import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.notificationService.success("succesfull login")
        this.router.navigateByUrl('/members');
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        this.notificationService.error(error.error);

      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
