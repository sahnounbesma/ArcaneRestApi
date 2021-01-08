import { NgModule, Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {UsersApiService} from '../../users/users-api.service';
import {User} from '../../users/user.model';
import { Location } from '@angular/common';
import { NgForm }   from '@angular/forms';



@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;

    @Input() user: User;

    title = 'app';
    usersList: User[];
    private _router: Subscription;

    constructor(private usersApi: UsersApiService,  private location: Location) { }

    ngOnInit() {}



  save(form: NgForm) {
     const nom = form.value['nom'];
     const prenom = form.value['prenom'];
     const pseudo = form.value['pseudo'];
     const password = form.value['password'];
     const date_naissance = form.value['date_naissance'];
     this.usersApi.addUser(nom, prenom, pseudo, password, date_naissance)
         .subscribe(res => {console.log(res);
    });
    location.replace('/#/');
  }


}
