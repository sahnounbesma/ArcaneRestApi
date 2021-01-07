import { Inject, Injectable, Output } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Storage } from '@ionic/storage';

// key that is used to access the data in local storage const 



@Injectable()


export class LocalStorageService {
     anotherToken = [];

     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     
     
     STORAGE_KEY = 'local_token';
     
     public storeOnLocalStorage(tokengen: string): string{
          
          // get array of tasks from local storage
          //console.log('before', this.storage.get(this.STORAGE_KEY) || []);
          this.storage.get(this.STORAGE_KEY) || [];
          this.storage.remove(this.STORAGE_KEY);
          //console.log('after 1', this.storage.get(this.STORAGE_KEY) || []);
          const currentToken = this.storage.get(this.STORAGE_KEY) || [];
          // push new task to array
          currentToken.push({
              'Content-Type': 'application/json', 
              'Authorization': tokengen 
          });
          // insert updated array to local storage
          this.storage.set(this.STORAGE_KEY, currentToken);
          //this.storage.set('header' , 'hamouda');
          //this.storage.set('token' , 'token');
          //console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
          return this.storage.get(this.STORAGE_KEY);
     }

      public storeHeader(header: string): string{
          this.storage.get(this.STORAGE_KEY) || [];
          this.storage.remove(this.STORAGE_KEY);
          const currentToken = this.storage.get(this.STORAGE_KEY) || [];
          // insert updated array to local storage
          this.storage.set('header' , header);
          //console.log('what', this.storage.get('header'));
          return this.storage.get(this.STORAGE_KEY);
     }
}

