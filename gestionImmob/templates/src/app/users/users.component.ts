import { Component, OnInit } from '@angular/core';
import { User} from '../user' ; 
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private messageService: MessageService) {}

  users: User[] = [];

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  add(pseudo: string, nom: string, prenom: string): void {
    pseudo = pseudo.trim();
    nom = nom.trim();
    prenom = prenom.trim();
    if (!pseudo) { return; }
    this.userService.addUser({ pseudo, nom, prenom } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

    delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
    }
  

}
