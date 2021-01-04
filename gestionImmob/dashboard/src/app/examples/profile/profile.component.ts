import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {UsersApiService} from '../../users/users-api.service';
import {User} from '../../users/user.model';
import { Location } from '@angular/common';



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
    @Input() user: User;


    title = 'app';
    usersListSubs: Subscription;
    usersList: User[];
    private _router: Subscription;

    constructor(private usersApi: UsersApiService,  private location: Location) { this.usersList = []; }

    ngOnInit() {
        this.usersListSubs = this.usersApi
          .getUsers()
          .subscribe(res => {
              this.usersList = res;
            },
            console.error
         );}


  goBack(): void {
  this.location.back();
  }

  save(): void {
  this.usersApi.updateUser(this.user)
    .subscribe(() => this.goBack());
  }     
    }
