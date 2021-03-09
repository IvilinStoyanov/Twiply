import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        loadChildren: () => import ('./modules/members/modules/member-list/member-list.module').then(m => m.MemberListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'members/:username',
        loadChildren: () => import ('./modules/members/modules/member-detail/member-detail.module').then(m => m.MemberDetailModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
