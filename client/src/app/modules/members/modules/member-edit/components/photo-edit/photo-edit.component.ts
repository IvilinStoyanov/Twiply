import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Member } from 'src/app/models/member';
import { AccountService } from 'src/app/services/account.service';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  @Input() member: Member;
  
  user: User;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }
}
