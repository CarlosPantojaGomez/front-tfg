import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { BACK_URL } from '../helpers/img.constants';
import { ProjectRequest } from '../interfaces/projectRequest';

type EntityResponseType = HttpResponse<Project>;
type EntityArrayResponseType = HttpResponse<Project[]>;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  URL:string;
  extend: string;

  noticiasURL:string = "https://prtfg-74ef0.firebaseio.com/noticias.json"
  noticiaURL:string = "https://prtfg-74ef0.firebaseio.com/noticias"

  constructor(private http:HttpClient) { 
    this.URL = BACK_URL;
  }


  getNoticia( key$:string):any {
    /* let url =`${this.noticiaURL}/${key$}.json`;
   
    return this.http.get(url)
      .pipe(map(res=>res.json() )) */

  }

  nuevoProyecto(projectRequest: ProjectRequest): Observable<EntityResponseType>{
    this.extend = this.URL + '/project';
    return this.http.post<any>(this.extend, projectRequest, { observe: 'response' });
  }


  getProjects( ):Observable<EntityArrayResponseType>{
    this.extend = this.URL + "/projects";
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
      res.body.forEach((project: Project) => {
        // product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }

}