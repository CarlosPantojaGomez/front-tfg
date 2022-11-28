import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() id: number;
  @Input() projectId: number;
  @Output() goBack = new EventEmitter();

  buttonDone: string;
  header: string;
  
  edit: boolean;

  editForm = this.fb.group({
    name: [],
    description: [],
    creationDate: [],
    endDate: []
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService) { }

  ngOnInit() {
    this.edit = false;
    
    this.buttonDone = 'Crear';
    this.header = 'Nueva Tarea';

    if(this.id != undefined){
      this.taskService.getTask(this.id.toString(10)).subscribe(data =>{
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          description: data.body.description
        });
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Producto';
        
      });
    }
  }

  save(){
    const productRequest = this.createFromForm();

    if(!this.edit){
      this.subscribeToSaveResponse(this.taskService.newTask(productRequest));
    }else{
      this.subscribeToSaveResponse(this.taskService.save(productRequest));
    }
  }

  private createFromForm(): Task {

    const project={
      id: this.projectId
    };

    const task={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      project: project
    };
    
    return task;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log('entra');
    
    this.goBack.emit();
  }
  protected onSaveError() {
    console.log("ERROR");
  }

}
