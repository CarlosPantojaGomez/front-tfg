import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/interfaces/noticia.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';

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
  
  product: Producto;
  edit: boolean;

  @ViewChild('myInputMiniatura', {static: false})
  myInputVariableMiniatura: ElementRef;
  profileImage: string;

  products: Array<Producto> = [];
  editForm = this.fb.group({
    title: [],
    sortDescription: [],
    description: [],
    producto: []
  });

  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiasService,
    private productService: ProductosService) { }

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
          description: data.body.description,
          sortDescription: data.body.sortDescription,
          producto: data.body.product != undefined ? data.body.product.id : null
        });
        
        this.profileImage = data.body.cardImage;

        this.buttonDone = 'Guardar';
        this.header = 'Editar Noticia';
        
      });
    }

    this.productService.getProductos().subscribe(data =>{

      this.products = data.body;
    
    });
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
    
    const noticia={
      id: this.edit ? this.id : null,
      description: this.editForm.get(['description']).value,
      sortDescription: this.editForm.get(['sortDescription']).value,
      title: this.editForm.get(['title']).value,
      creator: creator,
      product: this.product,
      cardImage: this.profileImage
    };
    
    return noticia;
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

  uploadMiniatura(evt) {
    console.log(evt);
    
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    
      this.myInputVariableMiniatura.nativeElement.value = "";
    }
  }

  protected handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    console.log(btoa(binaryString));
    const auxMainPicture = {
      url: 'data:image/webp;base64,' + btoa(binaryString),
      id$: Math.random() 
    }
    this.profileImage = auxMainPicture.url;
  }

  eliminarMiniatura() {
    this.profileImage = null;
  }

  changeProducto(producto: any){
    
    this.product = producto;
  }

}
