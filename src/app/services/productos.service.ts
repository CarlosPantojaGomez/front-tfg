import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Producto } from '../interfaces/producto.interface';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { ProductoRequest } from '../interfaces/productRequest.interface';
import { BACK_URL, NO_PRODUCT_PROFILE_PICTURE_2 } from '../helpers/img.constants';
import { FileEntity } from '../interfaces/file.interface';
import { ManualEntity } from '../interfaces/manual.interface';
import { ProductComment } from '../interfaces/productComment.interface';
import { ProductoRate } from '../interfaces/ProductRate.interface';

type EntityResponseType = HttpResponse<Producto>;
type EntityResponseTypeFileEntity = HttpResponse<FileEntity>;
type EntityResponseTypeProductoRate = HttpResponse<ProductoRate>;
type EntityResponseTypeRate = HttpResponse<number>;
type EntityArrayResponseTypeManualEntity = HttpResponse<ManualEntity[]>;
type EntityArrayResponseType = HttpResponse<Producto[]>;
type EntityArrayResponseTypeImage = HttpResponse<String[]>;


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  URL:string;
  extend: string;

  constructor(private http:HttpClient) { 
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
    return this.http.get<any>(this.extend, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); ; 
  }

  getProductRate(productId: string):Observable<EntityResponseTypeRate> {
    this.extend = this.URL + '/product/rate/'+ productId;
    return this.http.get<any>(this.extend, { observe: 'response' }); 
  }

  getProductFile(key$:string):Observable<EntityResponseTypeFileEntity> {
    this.extend = this.URL + '/product/download/'+ key$;
    return this.http.get<any>(this.extend, { observe: 'response' }); 
  }

  getProductRateForUser(productId: string, userId: string):Observable<EntityResponseTypeProductoRate> {
    this.extend = this.URL + '/product/rate/'+ productId + "/" + userId;
    return this.http.get<any>(this.extend, { observe: 'response' }); 
  }

  saveRate(rate: ProductoRate): Observable<EntityResponseTypeProductoRate>{
    this.extend = this.URL + '/productRate';
    return this.http.put<any>(this.extend, rate, { observe: 'response' });
  }

  getProductManuals(key$:string):Observable<EntityArrayResponseTypeManualEntity> {
    this.extend = this.URL + '/product/manuals/'+ key$;
    return this.http
      .get<any>(this.extend, { observe: 'response' }); 
  }

  writeComment(productComment: ProductComment): Observable<EntityResponseType>{
    this.extend = this.URL + '/productComment';
    return this.http.post<any>(this.extend, productComment, { observe: 'response' });
  }

  getProductos():Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/products";
    return this.http
      .get<any>(this.extend, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))); 
  }

  findbyName(input: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/products/findByName/' + input;
    return this.http.get<any>(this.extend, { observe: 'response' });
  }

  getImgProductosTop():Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/productsImageTop";
    return this.http
      .get<any>(this.extend, { observe: 'response' }); 
  }

  deleteProduct(productId: string):Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/product/delete/" + productId;
    return this.http
      .delete<any>(this.extend, { observe: 'response' });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };
      
      res.body.profileImage = res.body.profileImage != null ? res.body.profileImage : img;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      const img={
        url: NO_PRODUCT_PROFILE_PICTURE_2
      };
      res.body.forEach((product: Producto) => {
        product.profileImage = product.profileImage != null ? product.profileImage : img;
      });
    }
    return res;
  }
}
