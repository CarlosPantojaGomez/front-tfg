import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mail } from '../interfaces/mail.interface';
import { BACK_URL } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Mail>;
type EntityArrayResponseType = HttpResponse<Mail[]>;

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  URL:string;
  extend: string;

  noticiasURL:string = "https://prtfg-74ef0.firebaseio.com/noticias.json"
  noticiaURL:string = "https://prtfg-74ef0.firebaseio.com/noticias"

  constructor(private http:HttpClient) { 
    //this.URL = 'http://localhost:8080';
    this.URL = BACK_URL;
  }


  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
    //   res.body.cardImage = res.body.cardImage != null ? res.body.cardImage : '';
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((product: Mail) => {
        // product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }

}