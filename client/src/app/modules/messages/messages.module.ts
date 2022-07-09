import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessageContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
