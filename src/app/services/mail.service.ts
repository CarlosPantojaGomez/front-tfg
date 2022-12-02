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
export class MailService {
  URL:string;
  extend: string;

  constructor(private http:HttpClient) {
    this.URL = BACK_URL;
  }

  nuevoMail(mail: Mail): Observable<EntityResponseType>{
    this.extend = this.URL + '/mail';
    return this.http.post<any>(this.extend, mail, { observe: 'response' });
  }

  getMail( key$:string):any {
    this.extend = this.URL + '/mail/'+ key$;
    return this.http.get<any>(this.extend, { observe: 'response' }); 

  }

  getMails( ):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/news";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

  }

  getMailsByUserId(id: number):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/mails_receiver/" + id;
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

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