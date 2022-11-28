import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriorityLabelMapping, TaskPriority } from 'src/app/interfaces/priorities';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectRequest } from 'src/app/interfaces/projectRequest';
import { ProductosService } from 'src/app/services/productos.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {

  @Output() goBack = new EventEmitter();

  @Input() id: number;
  products: Array<Producto> = [];

  public PriorityLabelMapping = PriorityLabelMapping;

  public priorities = Object.values(TaskPriority).filter(value => typeof value === 'number');

  buttonDone: string;
  header: string;
  edit: boolean;
  product: Producto;

  proyectoView: boolean;
  tareasView: boolean;

  editForm = this.fb.group({
    name: [],
    prioridad: [],
    description: [],
    producto: []
  });

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private productService: ProductosService,
  ) { }

  ngOnInit() {
    console.log(this.priorities);
    this.proyectoView = true;
    this.buttonDone = 'Crear';
    this.header = 'Nuevo Proyecto';
    if(this.id != undefined){
      this.projectService.getProject(this.id.toString(10)).subscribe(data =>{
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          prioridad: data.body.priority,
          description: data.body.description,
          producto: data.body.product.id
        });
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Proyecto';
        
      });
    }
    
    this.productService.getProductos().subscribe(data =>{

      this.products = data.body;
      console.log(this.products);
    
    });
  }

  save(){
    const productRequest = this.createFromForm();

    if(!this.edit){
      this.subscribeToSaveResponse(this.projectService.nuevoProyecto(productRequest));
    }else{
      this.subscribeToSaveResponse(this.projectService.save(productRequest));
    }
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

  private createFromForm(): Project {
    
    this.product = this.products.find(obj => {
      return obj.id === this.editForm.get(['producto']).value
    })

    const project={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      priority: this.editForm.get(['prioridad']).value,
      description: this.editForm.get(['description']).value,
      product: this.product
    };

    return project;
  }

  changeProducto(producto: any){
    
    this.product = producto;
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.tareasView = false;
        this.proyectoView = true;
        break;
      case 2:
        this.tareasView = true;
        this.proyectoView = false;
      default:

        break;
    }
    
  }

}
