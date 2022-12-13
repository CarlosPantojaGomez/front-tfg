import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task.interface';
import { PriorityLabelMapping, TaskPriority } from 'src/app/interfaces/priorities';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Image } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() id: number;
  @Input() projectId: number;
  @Output() goBack = new EventEmitter();

  @ViewChild('myInputTaskImages', {static: false})
  myInputVariableTaskImages: ElementRef;

  buttonDone: string;
  header: string;
  
  public PriorityLabelMapping = PriorityLabelMapping;
  public priorities = Object.values(TaskPriority).filter(value => typeof value === 'number');
  edit: boolean;

  tareaView: boolean;
  usuariosView: boolean;

  usuariosRelated: Array<Usuario> = [];
  usuariosSearch: Usuario[];

  taskImages: Array<Image> = [];

  minDate1: Date;
  maxDate1: Date;

  minDate2: Date;
  maxDate2: Date;

  editForm = this.fb.group({
    name: [],
    prioridad: [],
    description: [],
    startDate: [],
    endDate: []
  });

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UsuariosService) { }

  ngOnInit() {

    const currentYear = new Date().getFullYear();
    this.minDate1 = new Date(currentYear - 20, 0, 1);
    this.maxDate1 = new Date(currentYear + 1, 11, 31);

    
    this.minDate2 = new Date(currentYear);
    this.maxDate2 = new Date(currentYear + 10, 0, 0);
    
    this.edit = false;
    
    this.tareaView = true;
    this.usuariosView = false;

    this.buttonDone = 'Crear';
    this.header = 'Nueva Tarea';
    console.log(this.id);
    
    if(this.id != undefined){
      this.taskService.getTask(this.id.toString(10)).subscribe(data =>{
        console.log(data);
        
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          description: data.body.description,
          prioridad: data.body.priority,
          startDate: data.body.startDate,
          endDate: data.body.endDate,
        });

        this.projectId = data.body.project?.id;

        this.taskImages = data.body.images;

        this.usuariosRelated = data.body.assignedUsers;
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Tarea';
        
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

    var creatorNickname = "";
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      creatorNickname = JSON.parse(sessionStorage.getItem('currentUser')).nickname
    }
    const creator={
      id: null,
      nickname: creatorNickname,
    };

    const task={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      priority: this.editForm.get(['prioridad']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      state: 0,
      project: project,
      assignedUsers: this.usuariosRelated,
      creator: creator,
      images: this.taskImages
    };
    
    return task;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log('entra');
    
    this.goBack.emit();
    this.taskService.refreshList.emit();
  }
  protected onSaveError() {
    console.log("ERROR");
  }

  public onClickMe(option: number) {
    console.log(option);
    
    switch (option) {
      case 1:
        this.tareaView = true;
        this.usuariosView = false;
        break;
      case 2:
        this.tareaView = false ;
        this.usuariosView = true;
        break;
      default:

        break;
    }
    
  }

  onSearchSetUser(searchValue: string): void {  
    if(searchValue.length > 2){
      this.userService.findbyNicknameForTask(searchValue, this.projectId.toString(10)).subscribe(data =>{
        if (data.body.length > 0){
          this.usuariosSearch = data.body;
        }else {
          this.usuariosSearch = undefined;
        }
      });
    } else {
      this.usuariosSearch = undefined;
    }
  }

  selectUser(i: number) {
    console.log(this.usuariosSearch[i]);
    
    this.usuariosRelated.push(this.usuariosSearch[i]);
    
    this.usuariosSearch = undefined;
    
  }
  
  deleteUser(indexx: number) {
    this.usuariosRelated.forEach((element,index)=>{
      if(index==indexx) this.usuariosRelated.splice(index,1);
    });
  }

  uploadtaskImage(evt) {
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleReaderTaskImageLoaded.bind(this);

      reader.readAsBinaryString(file);
        
      this.myInputVariableTaskImages.nativeElement.value = "";
    }
  }

  protected handleReaderTaskImageLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;

    const auxMainPicture = {
      url: 'data:image/webp;base64,' + btoa(binaryString) 
    }

    this.taskImages.push(auxMainPicture);

  }

  eliminarTaskImage(indexx: number) {
    
    this.taskImages.forEach((element,index)=>{
      if(index==indexx) this.taskImages.splice(index,1);
    });
  }

  setImageToShow(image: Image){
    this.taskService.imageToShow = image.url;
  }

  cleanUserSearch(){
    setTimeout(() => this.usuariosSearch = undefined,300);
    ;
  }

}
