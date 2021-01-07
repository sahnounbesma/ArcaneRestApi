import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {Bien} from './bien.model';

@Injectable()
export class BiensApiService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


  public getBiens(): Observable<Bien[]>  {
    return this.http.get<Bien[]>(`${API_URL}/bien`);
  }




     /** PUT: update a user */
  public updateBien(id: string, nom: string, description: string, type_bien: string, ville: string, pieces: string, caracteristiques: string, proprietaire:string): Observable<Bien> {
    const idBien = id;
    const url = `${API_URL}/biens/` + idBien;
    const bien = {
      id: '',
      nom: '',
      description: '',
      type_bien: '',
      ville: '',
      pieces: '',
      caracteristiques: '',
      proprietaire: ''
    };
    bien.id = id;
    bien.nom = nom;
    bien.description = description;
    bien.type_bien = type_bien;
    bien.ville = ville;
    bien.pieces = pieces;
    bien.caracteristiques = caracteristiques;
    bien.proprietaire = proprietaire;
    return this.http.put<Bien>(url, bien, this.httpOptions).pipe();

  }


   /** DELETE: delete a bien  */
  public deleteBien(id: string): Observable<Bien> {
    const idBien = id;
    const bien = {
      id: '',
    };
    bien.id = id;
    const url = `${API_URL}/biens/` + idBien;
    return this.http.delete<Bien>(url, httpOptions).pipe();

  }
}


