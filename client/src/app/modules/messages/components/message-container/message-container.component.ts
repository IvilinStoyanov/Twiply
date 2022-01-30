import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { MembersService } from 'src/app/modules/members/services/members.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {
  members: Member[];
  messages: Message[] = [];
  messageThread: any;
  username: string;
  pagination: Pagination;
  sendMessageForm: FormGroup;
  pageNumber = 1;
  pageSize = 100;
  loading = false;

  constructor(private membersService: MembersService, private messageService: MessageService, private fb: FormBuilder) {
    this.sendMessageForm = this.fb.group({
      content: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(type: string = 'Inbox') {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, type).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  getMessageThread(username: string) {
    this.username = username;
    this.messageService.getMessageThread(username).subscribe(thread => { this.messageThread = thread; console.log(thread) });
  }

  sendMessage() {
    let messageContent = this.sendMessageForm.get('content').value;

    this.messageService.sendMessage(this.username, messageContent).subscribe(message => {
      this.messageThread.push(message);
    });
  }
  
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
