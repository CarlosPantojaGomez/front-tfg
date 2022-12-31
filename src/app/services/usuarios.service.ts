import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators'; 
import { BACK_URL, NO_PRODUCT_PROFILE_PICTURE_2 } from '../helpers/img.constants';
import { ProductoBasketRequest } from '../interfaces/ProductBasketRequest.interface';

type EntityResponseType = HttpResponse<Usuario>;
type EntityArrayResponseType = HttpResponse<Usuario[]>;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL:string;
  extend: string;

  refreshUser: EventEmitter<number> = new EventEmitter();

  constructor(private http:HttpClient) { 
    this.URL = BACK_URL;
  }

  getRefreshListEmitter() {
    return this.refreshUser;
  }
  
  create(usuario: Usuario): Observable<EntityResponseType> {
    this.extend = this.URL + '/user';
    return this.http.post<any>(this.extend, usuario, { observe: 'response' });
      
  }

  getusuario(id: string): Observable<EntityResponseType> {
    this.extend = this.URL + '/user/' + id;
    return this.http.get<any>(this.extend, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); 
  }

  /* getUsuarioByMail(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/user/findEmail/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  getUsuarioByNickName(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/user/findNickName/' + key$;
    return this.http.get<any>(this.extend, { observe: 'response' });
  } */

  addProductToUserBasket(request :ProductoBasketRequest): Observable<EntityArrayResponseType>{
    this.extend = this.URL + '/user/basket';
    return this.http.put<any>(this.extend, request, { observe: 'response' });
  }

  removeProductFromUserBasket(request :ProductoBasketRequest): Observable<EntityArrayResponseType>{
    this.extend = this.URL + '/user/basket/'+request.product.id +"/"+ request.user.id;
    return this.http.delete<any>(this.extend, { observe: 'response' });
  }
  
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
    return this.http.get<any>(this.extend, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); 
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
    return this.http.put<any>(this.extend, usuario, { observe: 'response' });
  }

  actualizarPasswordUsuario(usuario :Usuario): Observable<EntityArrayResponseType>{
    this.extend = this.URL + '/userPassword';
    return this.http.put<any>(this.extend, usuario, { observe: 'response' });
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
    if (res.body) {
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };
      
      res.body.productsBought.forEach((product)=>{
        console.log(product);
        
        product.profileImage = product.profileImage != null ? product.profileImage : img;
      });

    }
    return res;
  }


}
