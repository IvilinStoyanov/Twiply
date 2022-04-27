import { HttpClient } from '@angular/common/http';
import { Message } from '../../../models/message';
import { getPaginatedResult, getPaginationHeaders } from '../../../helpers/paginationHelper';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', { recipientUsername: username, content: content });
  }
}
