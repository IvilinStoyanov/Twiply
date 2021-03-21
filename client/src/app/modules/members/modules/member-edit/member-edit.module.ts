import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberEditRoutingModule } from './member-edit.routing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MemberEditComponent } from './member-edit.component';
import { PhotoEditComponent } from './components/photo-edit/photo-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MemberEditRoutingModule,
    SharedModule
  ],
  declarations: [MemberEditComponent, PhotoEditComponent]
})
export class MemberEditModule { }
