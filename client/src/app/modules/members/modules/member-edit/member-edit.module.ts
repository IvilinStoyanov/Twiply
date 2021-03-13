import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberEditComponent } from './member-edit.component';
import { MemberEditRoutingModule } from './member-edit.routing';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MemberEditRoutingModule,
    SharedModule
  ],
  declarations: [MemberEditComponent]
})
export class MemberEditModule { }
