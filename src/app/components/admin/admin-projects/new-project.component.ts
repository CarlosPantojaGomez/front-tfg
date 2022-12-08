import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriorityLabelMapping, TaskPriority } from 'src/app/interfaces/priorities';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectRequest } from 'src/app/interfaces/projectRequest';
import { ProductosService } from 'src/app/services/productos.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {

  @Output() goBack = new EventEmitter();

  @Input() id: number;
  products: Array<Producto> = [];
  usuariosRelated: Array<Usuario> = [];
  usuariosSearch: Usuario[];

  public PriorityLabelMapping = PriorityLabelMapping;

  public priorities = Object.values(TaskPriority).filter(value => typeof value === 'number');

  buttonDone: string;
  header: string;
  edit: boolean;
  product: Producto;

  proyectoView: boolean;
  tareasView: boolean;
  usuariosView: boolean;

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
    private userService: UsuariosService
  ) { }

  ngOnInit() {
    this.proyectoView = true;
    this.usuariosView = false;
    this.buttonDone = 'Crear';
    this.header = 'Nuevo Proyecto';
    if(this.id != undefined){
      this.projectService.getProject(this.id.toString(10)).subscribe(data =>{
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          prioridad: data.body.priority,
          description: data.body.description,
          producto: data.body.product != undefined ? data.body.product.id : null
        });
        
        this.usuariosRelated = data.body.usersRelated;
        this.buttonDone = 'Guardar';
        this.header = 'Editar Proyecto';
        
      });
    }
    
    this.productService.getProductos().subscribe(data =>{

      this.products = data.body;
    
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

    var creatorNickname = "";
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      creatorNickname = JSON.parse(sessionStorage.getItem('currentUser')).nickname
    }
    const creator={
      id: null,
      nickname: creatorNickname,
    };

    const project={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      priority: this.editForm.get(['prioridad']).value,
      description: this.editForm.get(['description']).value,
      product: this.product,
      usersRelated: this.usuariosRelated,
      creator: creator
    };

    project.usersRelated

    return project;
  }

  changeProducto(producto: any){
    
    this.product = producto;
  }

  public onClickMe(option: number) {
    console.log(option);
    
    switch (option) {
      case 1:
        this.tareasView = false;
        this.proyectoView = true;
        this.usuariosView = false;
        break;
      case 2:
        this.tareasView = true;
        this.proyectoView = false;
        this.usuariosView = false;
        break;
      case 3:
        this.tareasView = false;
        this.proyectoView = false;
        this.usuariosView = true;
        break;
      default:

        break;
    }
    
  }

  onSearchSetUser(searchValue: string): void {  
    if(searchValue.length > 2){
      this.userService.findbyNicknameForProject(searchValue).subscribe(data =>{
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
}
