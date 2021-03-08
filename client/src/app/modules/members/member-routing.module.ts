import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberComponent } from './member.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [{ path: 'members/:id', component: MemberDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
