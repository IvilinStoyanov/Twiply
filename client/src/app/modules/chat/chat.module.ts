import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat.routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule
    
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatModule { }
