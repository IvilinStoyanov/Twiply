import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule
  ],
  declarations: [MemberComponent, MemberDetailComponent, MemberListComponent]
})
export class MemberModule { }
