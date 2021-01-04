import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {User} from './user.model';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UsersApiService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 

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





    /** PUT: update the hero on the server */
  //updateUser(user: User): Observable<any> {
   // return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
   //   tap(_ => this.log(`updated user id=${user.id}`)),
   //   catchError(this.handleError<any>('updateUser'))
   // );
  //}



    /** PUT: update the hero on the server */
  public updateUser(user: User): Observable<User> {
    const url = `${API_URL}/users/5fce8bb0d5112aa0f1cb1191`;
    return this.http.put<User>(url, { prenom: 'khraaa' }, {responseType: 'text'}).pipe();
    //return this.http.put<User>(url, { prenom: 'kwd' }).subscribe(data => {
       // this.prenom = data.prenom;
    //})
  }


}


