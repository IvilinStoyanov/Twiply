import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  duration = 3000;

  constructor(private _snackBar: MatSnackBar) {}

  error(message: string) {
    return this._snackBar.open(message, null, {
      panelClass: ['snackbar-error'],
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  success(message: string) {
    return this._snackBar.open(message, null, {
      panelClass: ['snackbar-success'],
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  info(message: string) {
    return this._snackBar.open(message, null, {
      panelClass: ['snackbar-info'],
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
