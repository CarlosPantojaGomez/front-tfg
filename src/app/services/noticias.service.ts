import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Noticia } from '../interfaces/noticia.interface';
import { Observable } from 'rxjs';
import { BACK_URL, NO_PRODUCT_PROFILE_PICTURE_2 } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Noticia>;
type EntityArrayResponseType = HttpResponse<Noticia[]>;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  URL:string;
  extend: string;

  noticiasURL:string = "https://prtfg-74ef0.firebaseio.com/noticias.json"
  noticiaURL:string = "https://prtfg-74ef0.firebaseio.com/noticias"

  constructor(private http:HttpClient) { 
    //this.URL = 'http://localhost:8080';
    this.URL = BACK_URL;
  }

  nuevaNoticia(noticia: Noticia): Observable<EntityResponseType>{
    this.extend = this.URL + '/new';
    return this.http.post<Noticia>(this.extend, noticia, { observe: 'response' });
  }

  updateNoticia(noticia: Noticia): Observable<EntityResponseType>{
    this.extend = this.URL + '/new';
    return this.http.put<Noticia>(this.extend, noticia, { observe: 'response' });
  }

  getNoticia(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/new/'+ key$;
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); 
  }
  
  getNoticias( ):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/news";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

  }
  
  getNoticiasByProductId( id: string):Observable<EntityArrayResponseType>{
    this.extend = this.URL + '/news/' + id;
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

  }

  deleteNoticia(key$:string): Observable<EntityResponseType>{
    this.extend = this.URL + '/new/delete/'+ key$;
    return this.http
      .delete<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); 
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.cardImage = res.body.cardImage != null ? res.body.cardImage : null;
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };
      
      res.body.productsRelated.forEach((product)=>{
        product.profileImage = product.profileImage != null ? product.profileImage : img;
      });
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((product: Noticia) => {
        product.cardImage = product.cardImage != null ? product.cardImage : null;
      });
    }
    return res;
  }

}
