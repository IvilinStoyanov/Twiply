import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

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
        loadChildren: () => import ('./modules/members/modules/member-list/member-list.module').then(m => m.MemberListModule)
      },
      {
        path: 'members/:username',
        loadChildren: () => import ('./modules/members/modules/member-detail/member-detail.module').then(m => m.MemberDetailModule)
      },
      {
        path: 'messages',
        loadChildren: () => import ('./modules/messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'chat',
        loadChildren: () => import ('./modules/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import ('./modules/members/modules/member-edit/member-edit.module').then(m => m.MemberEditModule),
        canDeactivate: [PreventUnsavedChangesGuard]
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
