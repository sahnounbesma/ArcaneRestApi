import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {User} from './user.model';

@Injectable()
export class UsersApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
 // getUserss(): Observable<User[]> {
   // return this.http
     // .get(`${API_URL}/user`)
      //.catch(UsersApiService._handleError);   

  //}

  public getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(`${API_URL}/user`);
  }
}


