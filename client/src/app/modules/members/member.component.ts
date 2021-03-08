import { Component, OnInit } from '@angular/core';
import { MembersService } from './services/members.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html'
})
export class MemberComponent implements OnInit {
  members: Member[];

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.membersService.getMembers().subscribe(members => this.members = members);
  }
}
