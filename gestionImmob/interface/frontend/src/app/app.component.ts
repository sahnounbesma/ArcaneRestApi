import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {UsersApiService} from './users/users-api.service';
import {User} from './users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  usersListSubs: Subscription;
  usersList: User[];

  constructor(private usersApi: UsersApiService) {
    this.usersList = [];
  }

  ngOnInit() {
    this.usersListSubs = this.usersApi
      .getUsers()
      .subscribe(res => {
          this.usersList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.usersListSubs.unsubscribe();
  }
}