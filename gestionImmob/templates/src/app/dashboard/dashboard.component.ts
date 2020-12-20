import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private heroService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.heroService.getUsers()
      .subscribe(users => this.users = users.slice(1, 5));
  }
}