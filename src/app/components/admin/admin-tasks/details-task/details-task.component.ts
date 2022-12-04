import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { StateLabelMapping, TaskState } from 'src/app/interfaces/priorities';
import { PriorityLabelMapping, TaskPriority } from 'src/app/interfaces/priorities';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {

  @Input() id: number;

  task: Task;

  tareaView: boolean;
  usuariosView: boolean;

  editForm = this.fb.group({
    state: [],
    prioridad: []
  });

  writeComment= this.fb.group({
    text: [],
  });

  public StateLabelMapping = StateLabelMapping;
  public states = Object.values(TaskState).filter(value => typeof value === 'number');

  
  public PriorityLabelMapping = PriorityLabelMapping;
  public priorities = Object.values(TaskPriority).filter(value => typeof value === 'number');

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.tareaView = true;
    if(this.id != undefined && this.id != 0){
      this.taskService.getTask(this.id.toString(10)).subscribe(data =>{
        this.task = data.body;

        this.editForm.patchValue({
          state: this.task.state,
          prioridad: this.task.priority
        });
        
      });
    }
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.tareaView = true;
        this.usuariosView = false;
        break;
      case 2:
        this.tareaView = false;
        this.usuariosView = true;
        break;
      case 3:
      default:

        break;
    }
    
  }

  updateStatePriority(){
    const productRequest = this.createFromForm();
    
      this.subscribeToSaveResponse(this.taskService.updatePriorityAndState(productRequest));
  }

  private createFromForm(): Task {

    const task={
      id: this.id,
      priority: this.editForm.get(['prioridad']).value,
      state: this.editForm.get(['state']).value
    };
    
    return task;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log('entra');
  }
  protected onSaveError() {
    console.log("ERROR");
  }

}
