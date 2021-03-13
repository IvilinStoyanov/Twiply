import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberEditComponent } from './member-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MemberEditComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberEditRoutingModule {}
