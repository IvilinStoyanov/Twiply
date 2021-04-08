import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { MembersService } from 'src/app/modules/members/services/members.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  @Input() member: Member;
  @Input() user: User;
  
  constructor(private accountService: AccountService, private memberService: MembersService) { }

  ngOnInit() { }
  
  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        
        if(p.id === photo.id) p.isMain = true
      })
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(photo => photo.id !== photoId);
    });
  }
}
