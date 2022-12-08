import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs/Rx';
import { BACK_URL } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Usuario>;
type EntityArrayResponseType = HttpResponse<Usuario[]>;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL:string;
  extend: string;

  constructor(private http:HttpClient) { 
    
    //this.URL = 'http://localhost:8080';
    this.URL = BACK_URL;
  }

  create(usuario: Usuario): Observable<EntityResponseType> {
    this.extend = this.URL + '/user';
    return this.http.post<any>(this.extend, usuario, { observe: 'response' });
      
  }
  /* create(usuario: Usuario): Observable<EntityResponseType>{
    this.extend = this.URL + '/user';
    let body = JSON.stringify(usuario);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    this.http.post<any>(this.extend, usuario, { observe: 'response' }).subscribe(data => {
      console.log(data);
    })
  } */

  getusuario(id: string): Observable<EntityResponseType> {
    this.extend = this.URL + '/user/' + id;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  /* getUsuarioByMail(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/user/findEmail/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  getUsuarioByNickName(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/user/findNickName/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  } */

  findbyNickname(input: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/users/findByNickname/' + input;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }
  
  findbyNicknameForProject(input: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/users/findByNicknameForProject/' + input;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  findbyNicknameForTask(input: string, projectId: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/users/findByNicknameForTask/' + input + "/" + projectId;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }
  getUsuarioBy(key$:string, input: string): Observable<EntityResponseType> {
    this.extend = this.URL + '/user/find' + input +'/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  getUsuariosBy(key$:string, input: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/users/find' + input +'/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  getUsuarios(): Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/users";
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  actualizarUsuario(usuario :Usuario): Observable<EntityArrayResponseType>{
    this.extend = this.URL + '/user';
    return this.http.post<any>(this.extend, usuario, { observe: 'response' });
  }

  borrarUsuario(key$: string): Observable<EntityResponseType> {
    this.extend = this.URL + '/userDelete/' + key$;
    return this.http.put<any>(this.extend, { observe: 'response' });
  }

  sendMail(subject: string, text: string): Observable<EntityResponseType> {
    this.extend = this.URL + '/sendMail/' + subject;
    return this.http.post<any>(this.extend, text, { observe: 'response' });
  }

  convertTypeToText(type: number) {
    switch (type) {
      case 1:
        return 'Cliente';
      case 2:
        return 'Trabajador';
      case 3:
        return 'Alto Cargo';
      default:
        return 'Admin';
    }
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    return res;
  }


}
