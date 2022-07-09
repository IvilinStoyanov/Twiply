import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MemberListRoutingModule } from './member-list.routing';

@NgModule({
  imports: [
    CommonModule,
    MemberListRoutingModule,
    SharedModule
  ],
  declarations: [MemberListComponent]
})
export class MemberListModule { }
