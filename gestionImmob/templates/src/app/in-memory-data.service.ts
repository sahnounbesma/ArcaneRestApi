import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
	  { id: 11, pseudo: 'Mok', password: 'h', nom: 'shn', prenom: 'bess', date_naissance: '12' },
  	  /* { id: 12, pseudo: 'Doc', password: 'h', nom: 'shn', prenom: 'Ness', date_naissance: '12' },
      { id: 13, pseudo: 'Fer3ouna', password: 'h', nom: 'shn', prenom: 'badou', date_naissance: '12' },
      { id: 14, pseudo: 'Boss', password: 'h', nom: 'shn', prenom: 'holy coco', date_naissance: '12' },
      { id: 15, pseudo: 'hamouda', password: 'h', nom: 'ha rbk', prenom: 'ha reb ta3ek', date_naissance: '12' },
      { id: 16, pseudo: 'bitch', password: 'h', nom: 'caca', prenom: 'bouda', date_naissance: '12' }
      */
      { id: 12, pseudo: 'Doc', nom: 'shn', prenom: 'Ness'},
      { id: 13, pseudo: 'Fer3ouna', nom: 'shn', prenom: 'badou'},
      { id: 14, pseudo: 'Boss', nom: 'shn', prenom: 'holy coco'},
      { id: 15, pseudo: 'hamouda', nom: 'ha rbk', prenom: 'ha reb ta3ek'},
      { id: 16, pseudo: 'bitch', nom: 'caca', prenom: 'bouda' }
    ];
    return {users};
  }




  // Overrides the genId method to ensure that a user always has an id.
  // If the users array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}