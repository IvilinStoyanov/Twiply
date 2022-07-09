import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from './member-detail.component';
import { MemberDetailRoutingModule } from './member-detail.routing';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MemberDetailRoutingModule,

    SharedModule
  ],
  declarations: [MemberDetailComponent]
})
export class MemberDetailModule { }
