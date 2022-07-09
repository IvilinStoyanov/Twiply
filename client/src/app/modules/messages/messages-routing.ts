import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageContainerComponent } from './components/message-container/message-container.component';

const routes: Routes = [
  {
    path: '',
    component: MessageContainerComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
