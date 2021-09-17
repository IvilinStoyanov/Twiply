import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MembersService } from '../../services/members.service';
import { UploadPhotoDialogComponent } from './components/upload-photo-dialog/upload-photo-dialog.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  member: Member;
  user: User;

  isEditable: boolean;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  likedByMembers: Partial<Member[]>;
  likedMembers: Partial<Member[]>;


  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.getMember();

    this.loadLikes('likedBy');
    this.loadLikes('liked');

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  getMember() {
    this.memberService
      .getMember(this.user.username)
      .subscribe((member) => (this.member = member));
  }

  loadLikes(predicate: string) {
    this.memberService.getLikes(predicate).subscribe(response => {
      if (predicate == 'likedBy') this.likedByMembers = response;
      if (predicate == 'liked') this.likedMembers = response;
    });
  }
  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  save() {
    // TODO: Add function to save details.
    this.memberService.updateMember(this.member).subscribe(() => {
      this.editForm.reset(this.member);
      this.notificationService.success('Profile has been updated.');
      console.log(this.member);
      this.toggleEdit();
    }, error => this.notificationService.error(error));
  }

  openUploadPhotoDialog(): void {
    const dialogRef = this.dialog.open(UploadPhotoDialogComponent, {

      autoFocus: false
    });
  }
}
