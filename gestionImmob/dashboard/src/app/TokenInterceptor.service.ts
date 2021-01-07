import { HttpInterceptor} from '@angular/common/http';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from './env';
import {User} from './users/user.model';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {
  public k; 
  public h;
  public kraht;
   constructor(private http: HttpClient, private localStorageService: LocalStorageService) {    }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
  };

  
   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {

      console.log('INTERCEPTOR');
      // We retrieve the token, if any

      const url = `${API_URL}/auth/login`;
      const user = {
      pseudo: 'BesmaShn',
      password: 'besma'
      };
      const token = this.http.post<User>(url, user, this.httpOptions).pipe();
      const j = token.subscribe( value => { this.k = value;  
      this.kraht = this.localStorageService.storeOnLocalStorage(this.k);
      console.log('here is the token', this.k);
      console.log(this.h);
       } );

      var pro = this.localStorageService['storage'];
      var t = pro['storage'];
      console.log(t);
      const tok = t['local_token'];
      console.log(tok);

      


      let newHeaders = req.headers;
      if (token) {
         // If we have a token, we append it to our new headers
         newHeaders = newHeaders.append('authtoken', tok);
      }
      // Finally we have to clone our request with our new headers
      // This is required because HttpRequests are immutable
      const authReq = req.clone({headers: newHeaders});
      // Then we return an Observable that will run the request
      // or pass it to the next interceptor if any
      return next.handle(authReq);



   }

}