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
      type: 'ball-grid-pulse',
      bdColor: 'rbga(255, 255, 255, 0)',
      color: '#ff5252d3',
      size: "medium"
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
