import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Usuario } from '../interfaces/usuario.interface';
import { BACK_URL } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Usuario>;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  URL:string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.URL = BACK_URL;
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<EntityResponseType> {
    return this.http.get<any>(BACK_URL+'/user/authenticate/' + username + '/' + password, { observe: 'response' })
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user.body));
            this.currentUserSubject.next(user.body);
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public confirmSession(id: number): boolean{
    let usuario: Usuario;
    usuario = JSON.parse(sessionStorage.getItem('currentUser'));
    if (usuario == null) {
      return false;
    } else if ( usuario.id != id) {
      return false;
    } else {
      return true;
    }
  }

  validateCredentials(username: string, password: string): Observable<EntityResponseType> {
    return this.http.get<any>(BACK_URL+'/user/authenticate/' + username + '/' + password, { observe: 'response' })
        .pipe(map(user => {
          return user;
        }));
  }
}
