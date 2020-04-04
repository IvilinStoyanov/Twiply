import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  modalRef: BsModalRef;
  openFlyout = false;

  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  toggleSidebar() {
    this.openFlyout = !this.openFlyout;
  }

  openLoginModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1,
      {
        class: 'modal-dialog-centered',
        animated: false
      });
  }

  closeLoginModal() {
    this.modalRef.hide();
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      // add noty
      this.alertify.success('Logged in successfully');
    }, error => {
     this.alertify.error('Logged in failed');
    }, () => {
      this.closeLoginModal();
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out succsessfully');
    this.router.navigate(['/home']);
  }
}
