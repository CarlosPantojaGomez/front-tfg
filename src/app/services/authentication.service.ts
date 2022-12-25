import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Usuario } from '../interfaces/usuario.interface';
import { BACK_URL } from '../helpers/img.constants';
import { UsuariosService } from './usuarios.service';
import { first } from 'rxjs/operators';

type EntityResponseType = HttpResponse<Usuario>;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  public usuarioLogeado: Usuario;

  refreshCoockieUser: EventEmitter<number> = new EventEmitter();

  URL:string;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuariosService
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.URL = BACK_URL;

    this.usuarioService.getRefreshListEmitter().subscribe(() => this.updateUser());
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  getRefreshCoockieUserEmitter() {
    return this.refreshCoockieUser;
  }

  protected updateUser() {
    console.log("ENTRA TRAS añadir al carrito");
    console.log(this.usuarioLogeado);
    console.log(JSON.parse(sessionStorage.getItem('currentUser'))!= null);
    
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      console.log("entra");
      this.login(JSON.parse(sessionStorage.getItem('currentUser')).nickname, JSON.parse(sessionStorage.getItem('currentUser')).password)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.refreshCoockieUser.emit();
                    
                },
                error => {
                    console.log("PETA");
                    
                });
    }
  }

  login(username: string, password: string): Observable<EntityResponseType> {
    console.log(username +" "+ password);
    
    return this.http.get<any>(BACK_URL+'/user/authenticate/' + username + '/' + password, { observe: 'response' })
        .pipe(map(user => {
          console.log(user);
          
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user.body));
            this.currentUserSubject.next(user.body);
            this.usuarioLogeado =user.body;
            console.log("emite evento");
            
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.refreshCoockieUser.emit();
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
