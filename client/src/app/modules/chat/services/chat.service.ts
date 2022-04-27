import { Injectable, NgZone } from '@angular/core';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
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
  }

  stopHubConnection() {
    if (this.hubConnection) this.hubConnection.stop();
  }

}
