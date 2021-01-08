import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {UsersApiService} from '../../users/users-api.service';
import {User} from '../../users/user.model';
import { Location } from '@angular/common';
import { NgForm }   from '@angular/forms';

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

  save(form: NgForm) {
     const nom = form.value['nom'];
     const prenom = form.value['prenom'];
     const id = form.value['id'];
     const pseudo = form.value['pseudo'];
     this.usersApi.updateUser(id, nom, prenom, pseudo)
         .subscribe(res => {console.log(res);
         this.usersListSubs = this.usersApi.getUsers()
             .subscribe(res => {this.usersList = res;},
             console.error
          );
    });
  }

  supp(form: NgForm) {
    console.log(form.value);
    const id = form.value['id'];
    this.usersApi.deleteUser(id)
        .subscribe(res => {console.log(res);
        this.usersListSubs = this.usersApi.getUsers()
            .subscribe(res => {this.usersList = res;},
            console.error
            );
        });
  }

  }
