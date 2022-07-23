import { Injectable, NgZone } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private notificationService: NotificationService, private ngZone: NgZone) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.ngZone.run(() => {
          this.onlineUsersSource.next([...usernames, username]);
        });
      });
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.ngZone.run(() => {
          this.onlineUsersSource.next([...usernames.filter(u => u !== username)]);
        });
      });
    });

    this.hubConnection.on('GetOnlineUsers', (username: string[]) => {
      this.ngZone.run(() => {
        this.onlineUsersSource.next(username);
      });
    });

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.ngZone.run(() => {
        this.notificationService.info(username + ' send you a message.')
      });
    });

  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
