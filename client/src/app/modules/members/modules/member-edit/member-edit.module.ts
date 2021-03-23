import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberEditRoutingModule } from './member-edit.routing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MemberEditComponent } from './member-edit.component';
import { PhotoEditComponent } from './components/photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxProgressModule } from '@ngx-lite/progress';
import { UploadPhotoDialogComponent } from './components/upload-photo-dialog/upload-photo-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MemberEditRoutingModule,
    SharedModule,
    NgxProgressModule,
    FileUploadModule
  ],
  declarations: 
  [
    MemberEditComponent,
    PhotoEditComponent,
    UploadPhotoDialogComponent
  ]
})
export class MemberEditModule { }
