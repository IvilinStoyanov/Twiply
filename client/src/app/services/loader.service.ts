import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  requestCounts = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.requestCounts++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rbga(255, 255, 255, 0)',
      color: '#333333',
    });
  }

  idle() {
    this.requestCounts--;
    if (this.requestCounts <= 0) {
      this.requestCounts = 0;
      this.spinnerService.hide();
    }
  }
}
