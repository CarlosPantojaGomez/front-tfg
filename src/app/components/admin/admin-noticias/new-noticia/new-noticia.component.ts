import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-new-noticia',
  templateUrl: './new-noticia.component.html',
  styleUrls: ['./new-noticia.component.css']
})
export class NewNoticiaComponent implements OnInit {
  @Input() id: number;
  @Output() goBack = new EventEmitter();

  buttonDone: string;
  header: string;
  
  edit: boolean;

  editForm = this.fb.group({
    title: [],
    description: [],
    sortDescription: [],
    creationDate: [],
    endDate: []
  });

  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiasService) { }

  ngOnInit() {
    this.edit = false;
    
    this.buttonDone = 'Crear';
    this.header = 'Nueva Noticia';

    if(this.id != undefined){
      this.noticiaService.getNoticia(this.id.toString(10)).subscribe(data =>{
        console.log(data);
        
        this.edit = true;
        this.editForm.patchValue({
          title: data.body.title,
          description: data.body.description
        });
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Noticia';
        
      });
    }
  }

  save(){
    const productRequest = this.createFromForm();

    if(!this.edit){
      this.subscribeToSaveResponse(this.noticiaService.nuevaNoticia(productRequest));
    }else{
      this.subscribeToSaveResponse(this.noticiaService.updateNoticia(productRequest));
    }
  }

  private createFromForm(): Noticia {

    const task={
      id: this.edit ? this.id : null,
      description: this.editForm.get(['description']).value,
      sortDescription: this.editForm.get(['sortDescription']).value,
      title: this.editForm.get(['title']).value
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
