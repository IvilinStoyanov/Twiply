import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from '../messages/services/message.service';
import { ChatService } from './services/chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  state: any;
  user: User;
  otherUsername: string;

  messageThread: any;
  sendMessageForm: FormGroup;
  pageNumber = 1;
  pageSize = 100;
  isLoading: boolean = true;
  isChatLoading: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private messageService: MessageService,
    private accountService: AccountService, public chatService: ChatService) {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

    this.sendMessageForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit() {
    if (this.state == undefined) {
      this.router.navigateByUrl('/members');
    } else {
      this.otherUsername = this.state.username;
      this.getMessageThread();
    }
  }

  getMessageThread() {
    // this.isChatLoading = true;
    // this.messageService.getMessageThread(this.username).subscribe(thread => { this.messageThread = thread; this.isChatLoading = false; });
    this.chatService.createHubConnection(this.user, this.otherUsername)
  }

  sendMessage() {
    let messageContent = this.sendMessageForm.get('content').value;

    this.messageService.sendMessage(this.otherUsername, messageContent).subscribe(message => {
      this.messageThread.push(message);
      this.sendMessageForm.reset();
    });
  }
}
