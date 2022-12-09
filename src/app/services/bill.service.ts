import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../interfaces/bill.interface';
import { BACK_URL } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Bill>;
type EntityArrayResponseType = HttpResponse<Bill[]>;

@Injectable({
  providedIn: 'root'
})
export class BillService {
  URL:string;
  extend: string;

  constructor(private http:HttpClient) {
    this.URL = BACK_URL;
  }


  getNoticia( key$:string):any {
    /* let url =`${this.noticiaURL}/${key$}.json`;
   
    return this.http.get(url)
      .pipe(map(res=>res.json() )) */

  }

  getBills( ):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/bills";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 

  }

  getBillsByProduct(productId: number):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/bills/product/"+ productId;
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
      res.body.forEach((product: Bill) => {
        // product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }

}
