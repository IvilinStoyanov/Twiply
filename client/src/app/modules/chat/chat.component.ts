import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  username: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events
    .pipe(filter(e => e instanceof NavigationStart))
    .subscribe((e: NavigationStart) => {
     const navigation  = this.router.getCurrentNavigation();
     this.username = navigation.extras.state ? navigation.extras.state.username : null;
     console.log(this.username);
    });
    debugger;
    if (this.username == undefined) {
      this.router.navigateByUrl['/members'];
    } 
  }

}
