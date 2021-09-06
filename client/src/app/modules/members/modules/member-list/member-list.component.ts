import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { NotificationService } from 'src/app/services/notification.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  likedMembers: Partial<Member[]>;

  constructor(private membersService: MembersService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getMembers();

    this.loadLikes('liked');
    this.loadLikes('likedBy');
  }

  getMembers() {
    this.membersService
      .getMembers(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  changePage(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getMembers();
  }

  addLike(member: Member) {
    this.membersService.addLike(member.username).subscribe(() => this.notificationService.success('You have liked ' + member.knownAs));
  }

  loadLikes(predicate: string) {
    this.membersService.getLikes(predicate).subscribe(resposne => {
      this.likedMembers = resposne;
    })
  }
}
