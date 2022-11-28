import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Producto } from '../interfaces/producto.interface';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { ProductoRequest } from '../interfaces/productRequest.interface';
import { BACK_URL } from '../helpers/img.constants';

type EntityResponseType = HttpResponse<Producto>;
type EntityArrayResponseType = HttpResponse<Producto[]>;
type EntityArrayResponseTypeImage = HttpResponse<String[]>;


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  URL:string;
  extend: string;

  constructor(private http:HttpClient) { 
    //this.URL = 'http://localhost:8080';
    this.URL = BACK_URL;
  }

  nuevoProducto(productRequest: ProductoRequest): Observable<EntityResponseType>{
    this.extend = this.URL + '/product';
    return this.http.post<any>(this.extend, productRequest, { observe: 'response' });
  }

  save(productRequest: ProductoRequest): Observable<EntityResponseType>{
    this.extend = this.URL + '/product';
    return this.http.put<any>(this.extend, productRequest, { observe: 'response' });
  }

  getProducto(key$:string):Observable<EntityResponseType> {
    this.extend = this.URL + '/product/'+ key$;
    return this.http.get<any>(this.extend, { observe: 'response' }); 
  }

  getProductos():Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/products";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 
  }

  getImgProductosTop():Observable<EntityArrayResponseTypeImage> {
    this.extend = this.URL + "/productsImageTop";
    return this.http
      .get<any>(this.extend, { observe: 'response' }); 
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      console.log(res.body);
      
      res.body.profileImage = res.body.profileImage != null ? res.body.profileImage : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      console.log(res.body);
      res.body.forEach((product: Producto) => {
        product.profileImage = product.profileImage != null ? product.profileImage : undefined;
      });
    }
    return res;
  }
}
