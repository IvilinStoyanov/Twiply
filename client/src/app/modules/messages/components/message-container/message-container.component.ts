import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
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
  isLoading: boolean = true;
  isChatLoading: boolean = true;

  constructor(private messageService: MessageService, private fb: FormBuilder, private router: Router) {
    this.sendMessageForm = this.fb.group({
      content: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.isLoading = false;
    })
  }

  sendToChat(senderUsername: string) {
    this.router.navigate(['/chat'], { state: { username: senderUsername } });
  }
  
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
