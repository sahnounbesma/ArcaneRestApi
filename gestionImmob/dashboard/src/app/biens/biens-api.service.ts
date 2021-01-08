import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';  
import {API_URL} from '../env';
import {Bien} from './bien.model';
import { LocalStorageService } from '../localStorage.service';

@Injectable()
export class BiensApiService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


  public getBiens(): Observable<Bien[]>  {
    console.log('hamouda', this.localStorageService);
    return this.http.get<Bien[]>(`${API_URL}/bien`);
  }


  public searchBienVille(ville: string): Observable<Bien[]>  {
    const villeParam = ville;
    const url = `${API_URL}/biens/ville/`+ villeParam; 
    return this.http.get<Bien[]>(url);
  }


  public searchBienType(type_bien: string): Observable<Bien[]>  {
    const type_bienParam = type_bien;
    const url = `${API_URL}/biens/type/`+ type_bienParam; 
    return this.http.get<Bien[]>(url);
  }


  public searchBienPiece(pieces: string): Observable<Bien[]>  {
    const piecesParam = pieces;
    const url = `${API_URL}/biens/pieces/`+ piecesParam; 
    return this.http.get<Bien[]>(url);
  }



     /** PUT: update a bien */
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
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['header'];
    var hh = j; 
    var ham = JSON.parse(hh);
    console.log('baynaaaaaaa', ham);
    var he = new HttpHeaders(ham);
    console.log('the header normal', he);
    var opts = { headers: he };
    return this.http.put<Bien>(url, bien, opts).pipe();

  }


   /** DELETE: delete a bien  */
  public deleteBien(id: string): Observable<Bien> {
    const idBien = id;
    const bien = {
      id: '',
    };
    bien.id = id;
    const url = `${API_URL}/biens/` + idBien;
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['header'];
    var hh = j; 
    var ham = JSON.parse(hh);
    console.log('baynaaaaaaa', ham);
    var he = new HttpHeaders(ham);
    console.log('the header normal', he);
    var opts = { headers: he };
    return this.http.delete<Bien>(url, opts).pipe();

  }

  /** Post: add a bien*/
  public addBien(nom: string, description: string, type_bien: string, ville: string, pieces: string, caracteristiques: string, proprietaire:string): Observable<Bien> {
    const url = `${API_URL}/bien`;
    const bien = {
      nom: '',
      description: '',
      type_bien: '',
      ville: '',
      pieces: '',
      caracteristiques: '',
      proprietaire: ''
    };
    bien.nom = nom;
    bien.description = description;
    bien.type_bien = type_bien;
    bien.ville = ville;
    bien.pieces = pieces;
    bien.caracteristiques = caracteristiques;
    bien.proprietaire = proprietaire;
    var pro = this.localStorageService['storage'];
    var t = pro['storage'];
    var j = t['header'];
    var hh = j; 
    var ham = JSON.parse(hh);
    console.log('baynaaaaaaa', ham);
    var he = new HttpHeaders(ham);
    console.log('the header normal', he);
    var opts = { headers: he };
    return this.http.post<Bien>(url, bien, opts).pipe();

  }
}


