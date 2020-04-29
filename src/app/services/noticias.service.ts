import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Noticia } from '../interfaces/noticia.interface';
import { Observable } from 'rxjs';

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
    this.URL = 'http://localhost:8080';
  }


  getNoticia( key$:string):any {
    /* let url =`${this.noticiaURL}/${key$}.json`;
   
    return this.http.get(url)
      .pipe(map(res=>res.json() )) */

  }

  getNoticias( ):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/news";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.cardImage = res.body.cardImage != null ? res.body.cardImage : '';
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((product: Noticia) => {
        product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }

}
