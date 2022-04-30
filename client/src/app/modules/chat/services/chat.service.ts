import { Injectable, NgZone } from '@angular/core';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;

  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();


  constructor(private ngZone: NgZone) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('RecieveMessageThread', messages => {
      this.ngZone.run(() => {
        this.messageThreadSource.next(messages);
      });
    });

    this.hubConnection.on('NewMessage', message => {
      this.ngZone.run(() => {
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          this.messageThreadSource.next([...messages, message]);
        })
      });
    });
  }

  stopHubConnection() {
    if (this.hubConnection) this.hubConnection.stop();
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection.invoke('SendMessage', { recipientUsername: username, content: content })
      .catch(error => console.log(error));
  }
}
