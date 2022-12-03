import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BACK_URL } from '../helpers/img.constants';
import { Activity } from '../interfaces/Activity.interface';

type EntityResponseType = HttpResponse<Activity>;
type EntityArrayResponseType = HttpResponse<Activity[]>;
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  URL:string;
  extend: string;

  constructor(private http:HttpClient) { 
    this.URL = BACK_URL;
  }
  
  getActivitiesByUserId(id: string): Observable<EntityArrayResponseType> {
    this.extend = this.URL + '/activities/' + id;
    return this.http.get<any>(this.extend, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((activity: Activity) => {
        activity.object = activity.mail != null ? "el mensaje: " + activity.mail.subject : activity.product != null ? "el producto: " + activity.product.name : activity.project != null ? "el proyecto: " + activity.project.name : activity.task != null ? "la tarea: " + activity.task.name : "";
        // product.cardImage = product.cardImage != null ? product.cardImage : '';
      });
    }
    return res;
  }

}
