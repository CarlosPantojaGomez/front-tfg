import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BACK_URL, NO_PRODUCT_PROFILE_PICTURE_2 } from '../helpers/img.constants';
import { Basket } from '../interfaces/basket.interface';

type EntityResponseType = HttpResponse<Basket>;
type EntityArrayResponseType = HttpResponse<Basket[]>;

@Injectable({
  providedIn: 'root'
})
export class BasketService {
    
  URL:string;
  extend: string;

  constructor(private http:HttpClient) { 
    this.URL = BACK_URL;
  }

  getBasketByUser(userId: number):Observable<EntityResponseType>{
    this.extend = this.URL + "/basket/"+ userId.toString(10);
    return this.http.get<any>(this.extend, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); 
  }

  createBasket(basket: Basket): Observable<EntityResponseType>{
    this.extend = this.URL + '/basket';
    return this.http.post<any>(this.extend, basket, { observe: 'response' });
  }

  updateBasket(basket: Basket): Observable<EntityResponseType>{
    this.extend = this.URL + '/basket';
    return this.http.put<any>(this.extend, basket, { observe: 'response' });
  }

  deleteBasket(basketId: string):Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/basket/delete/" + basketId;
    return this.http
      .delete<any>(this.extend, { observe: 'response' });
  }
  
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };
      
      res.body.products.forEach((product)=>{
        product.profileImage = product.profileImage != null ? product.profileImage : img;
      });

    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };

      res.body.forEach((basket: Basket) => {
        basket.products.forEach((product)=>{
          product.profileImage = product.profileImage != null ? product.profileImage : img;
        });
        // product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }
}