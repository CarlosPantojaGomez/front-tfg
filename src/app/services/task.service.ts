import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Task } from '../interfaces/task.interface';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { BACK_URL } from '../helpers/img.constants';
import { Project } from '../interfaces/project.interface';
import { TaskComment } from '../interfaces/taskComment.interface';

type EntityResponseType = HttpResponse<Task>;
type EntityArrayResponseType = HttpResponse<Task[]>;


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  URL:string;
  extend: string;

  
  imageToShow: string;

  constructor(private http:HttpClient) { 
    //this.URL = 'http://localhost:8080';
    this.URL = BACK_URL;
  }

  newTask(task: Task){
    this.extend = this.URL + '/task';
    return this.http.post<any>(this.extend, task, { observe: 'response' });
  }

  save(productRequest: Task): Observable<EntityResponseType>{
    this.extend = this.URL + '/task';
    return this.http.put<any>(this.extend, productRequest, { observe: 'response' });
  }

  writeComment(taskCommentt: TaskComment): Observable<EntityResponseType>{
    this.extend = this.URL + '/taskComment';
    return this.http.post<any>(this.extend, taskCommentt, { observe: 'response' });
  }

  updatePriorityAndState(productRequest: Task): Observable<EntityResponseType>{
    this.extend = this.URL + '/taskUpdatePriorityState';
    return this.http.put<any>(this.extend, productRequest, { observe: 'response' });
  }

  getTask(id: string):Observable<EntityResponseType> {
    this.extend = this.URL + '/task/'+ id;
    return this.http.get<any>(this.extend, { observe: 'response' }); 
  }

  getTasks():Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/tasks";
    return this.http
      .get<any>(this.extend, { observe: 'response' });
  }

  getTasksByUser(userId: string):Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/tasks/user/" + userId;
    return this.http
      .get<any>(this.extend, { observe: 'response' });
  }

  getTasksByProject(projectId: string):Observable<EntityArrayResponseType> {
    this.extend = this.URL + "/tasks/project/" + projectId;
    return this.http
      .get<any>(this.extend, { observe: 'response' });
  }
  
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((task: Task) => {
      });
    }
    return res;
  }
}