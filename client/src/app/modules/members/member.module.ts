import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule
  ],
  declarations: [MemberComponent, MemberDetailComponent]
})
export class MemberModule { }
