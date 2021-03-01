import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [{ path: 'members/:id', component: MemberDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
