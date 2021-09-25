import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {
  messages: any = [];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(type: string = 'Unread') {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, type).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
