import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {Bien} from './bien.model';

@Injectable()
export class BiensApiService {

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

  public getBiens(): Observable<Bien[]>  {
    return this.http.get<Bien[]>(`${API_URL}/bien`);
  }
}


