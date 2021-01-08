import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {User} from './user.model';

import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../localStorage.service';
import {TokenInterceptorService} from '../TokenInterceptor.service';

@Injectable()
export class UsersApiService {
  public k; 
  public h;
  public kraht;
  public head;
  

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private tokenInterceptorService: TokenInterceptorService) {

  //this.head = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
  };


  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


/** GET : get all users  */
  public getUsers(): Observable<User[]>  {
    const url = `${API_URL}/user`;
    return this.http.get<User[]>(url);
  }



    /** PUT: update a user */
  public updateUser(id: string, nom: string, prenom: string, pseudo:string): Observable<User> {
    const idUser = id;
    const url = `${API_URL}/users/` + idUser;
    const user = {
      id: '',
      nom: '',
      prenom: '',
      pseudo: ''
    };
    user.id = id; 
    user.nom = nom;
    user.prenom = prenom;
    user.pseudo = pseudo; 
    console.log('the header', this.head);
    this.head = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' });
    console.log('the header', this.head);
    console.log('ya rebi la3ziz', this.localStorageService['storage']); 
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['header'];
    var hh = j; //.substring(0, j.length - 1);
    //console.log('baynaaaaaaa', hh);
    //var hh = bes.replace(/"/g, "'");
    //var bzf = hh.substring(1, j.length - 1);
    var ham = JSON.parse(hh);
    console.log('baynaaaaaaa', ham);
    var he = new HttpHeaders(ham);
    console.log('the header normal', he);
    var opts = { headers: he };
    return this.http.put<User>(url, user, opts).pipe();

  }



      /** POST: add a user  */
  public addUser(nom: string, prenom: string, pseudo: string, password: string, date_naissance: string): Observable<User> {
    const url = `${API_URL}/auth/signup`;
    const user = {
      nom: '',
      prenom: '',
      pseudo: '',
      password: '', 
      date_naissance : ''
    };
    user.nom = nom;
    user.prenom = prenom;
    user.pseudo = pseudo;
    user.password = password; 
    user.date_naissance = date_naissance; 
    return this.http.post<User>(url, user, this.httpOptions).pipe();
  }

    /** DELETE: delete a user  */
  public deleteUser(id: string): Observable<User> {
    const idUser = id;
    const user = {
      id: '',
    };
    user.id = id;
    const url = `${API_URL}/users/` + idUser;
    this.head = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' });
    console.log('the header', this.head);
    this.head = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' });
    console.log('the header', this.head);
    console.log('ya rebi la3ziz', this.localStorageService['storage']); 
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['header'];
    var hh = j; 
    var ham = JSON.parse(hh);
    console.log('baynaaaaaaa', ham);
    var he = new HttpHeaders(ham);
    console.log('the header normal', he);
    var opts = { headers: he };
    return this.http.delete<User>(url, opts).pipe();

  }



  public connect(pseudo: string, password: string): Observable<User> {
    const url = `${API_URL}/auth/login`;
    const user = {
      pseudo: '',
      password: ''
    };
    user.pseudo = pseudo;
    user.password = password; 
    const token = this.http.post<User>(url, user, this.httpOptions).pipe();
    const f = token.subscribe( value => { this.k = value;  
    this.kraht = this.localStorageService.storeOnLocalStorage(this.k);
    } );  // changer here also   const j
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['local_token'];
    var bes = (j as unknown as string).substring(1, (j as unknown as string).length - 1);   // changed here
    var hh = bes.replace(/{"token":"/g, "\"Bearer ");
    hh = hh.substring(0, hh.length - 1);
    var ham = JSON.parse(hh);
    var he = new HttpHeaders(ham);
    console.log('he----------->',he);
    this.head = he;
    var v1 = this.localStorageService['storage'];
    console.log(v1);
    var v2 = v1['storage'];
    var v3 = v2['header'];
    console.log('ha howa', v3);
    console.log('hama khaytii', ham);
    var nchallah = this.localStorageService.storeHeader(ham);
    console.log('ya rebi la3ziz', this.localStorageService['storage']); 
    return this.http.post<User>(url, user, this.httpOptions).pipe();

  }




}










