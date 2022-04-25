import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService } from '../messages/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  state: any;
  username: string;

  messageThread: any;
  sendMessageForm: FormGroup;
  pageNumber = 1;
  pageSize = 100;
  isLoading: boolean = true;
  isChatLoading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private messageService: MessageService) { 
    this.state = this.router.getCurrentNavigation()?.extras?.state;

    this.sendMessageForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit() {
    if (this.state == undefined) {
      this.router.navigateByUrl('/members');
  } else {
    this.username = this.state.username;
    this.getMessageThread();
  }
}

getMessageThread() {
  this.isChatLoading = true;
  this.messageService.getMessageThread(this.username).subscribe(thread => { this.messageThread = thread; this.isChatLoading = false; });
}

sendMessage() {
  let messageContent = this.sendMessageForm.get('content').value;

  this.messageService.sendMessage(this.username, messageContent).subscribe(message => {
    this.messageThread.push(message);
    this.sendMessageForm.reset();
  });
}
}
