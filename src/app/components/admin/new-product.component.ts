import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductoRequest } from 'src/app/interfaces/productRequest.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FileEntity } from 'src/app/interfaces/file.interface';
import { Image } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {

  @Output() goBack = new EventEmitter();

  @Input() id: number;

  @ViewChild('myInputMiniatura', {static: false})
  myInputVariableMiniatura: ElementRef;

  @ViewChild('myInputMainImages', {static: false})
  myInputVariableMainImages: ElementRef;

  @ViewChild('myInputFile', {static: false})
  myInputVariableFile: ElementRef;
  
  @ViewChild('myInputManuales', {static: false})
  myInputVariableManuales: ElementRef;
  
  buttonDone: string;
  header: string;
  
  edit: boolean;

  miniatura: boolean;
  principal: boolean;
  manuals: boolean;
  descarga: boolean;

  profileImage: Image;
  mainImages: Array<Image> = [];
  fileToUpload: FileEntity;
  manuales: Array<FileEntity> = [];
  
  editForm = this.fb.group({
    name: [],
    sortDescription: [],
    description: [],
    features: [],
    price: [],
    forSale: []
  });
  
  constructor(
    private fb: FormBuilder,
    private productoService: ProductosService
    ) { }

  ngOnInit() {
    this.edit = false;
    this.miniatura = true;
    
    this.buttonDone = 'Crear';
    this.header = 'Nuevo Producto';
    if(this.id != undefined){
      this.productoService.getProducto(this.id.toString(10)).subscribe(data =>{
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          description: data.body.description,
          sortDescription: data.body.sortDescription,
          features: data.body.features,
          price: data.body.price,
          forSale: data.body.forSale
        });

        this.profileImage = data.body.profileImage;

        this.mainImages = data.body.images.filter(obj => {
          return obj.imageType == 2
        });

        this.fileToUpload = data.body.file;

        data.body.manuals.forEach((element,index)=>{
          this.manuales.push(element.file);
        });
        
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Producto';
        
      });
    }
    
  }

  save(){
    const productRequest = this.createFromForm();

    if(!this.edit){
      this.subscribeToSaveResponse(this.productoService.nuevoProducto(productRequest));
    }else{
      this.subscribeToSaveResponse(this.productoService.save(productRequest));
    }
  }

  handleFileInput(files: any) {
    
      const file = files.item(0);
      this.changeFile(file).then((base64: string): any => {
        
        this.fileToUpload ={
            name: file.name,
            data: base64,
            type: file.type
          }
      });

      
    this.myInputVariableFile.nativeElement.value = "";
    
  }
  
  handleManuals(files: any) {
    
      const file = files.item(0);
      
      this.changeFile(file).then((base64: string): any => {
        
        const auxfile = {
          name: file.name,
          data: base64,
          type: file.type
        }

        this.manuales.push(auxfile);
        
      });

      
    this.myInputVariableManuales.nativeElement.value = "";
    
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  uploadMiniatura(evt) {
    
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
    const auxMainPicture = {
      url: 'data:image/webp;base64,' + btoa(binaryString),
      id$: Math.random() 
    }
    this.profileImage = auxMainPicture;
  }

  uploadMainFile(evt) {
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleReaderMainLoaded.bind(this);

      reader.readAsBinaryString(file);
        
      this.myInputVariableMainImages.nativeElement.value = "";
    }
  }

  protected handleReaderMainLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;

    const auxMainPicture = {
      url: 'data:image/webp;base64,' + btoa(binaryString),
      id$: Math.random() 
    }

    this.mainImages.push(auxMainPicture);

  }

  eliminarMiniatura() {
    this.profileImage = null;
  }

  eliminarMainPicture(indexx: number) {
    
    this.mainImages.forEach((element,index)=>{
      if(index==indexx) this.mainImages.splice(index,1);
    });
  }

  eliminarDescarga() {
    this.fileToUpload = undefined;
  }

  eliminarManual(indexx: number) {
    this.manuales.forEach((element,index)=>{
      if(index==indexx) this.manuales.splice(index,1);
    });
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.miniatura = true;
        this.principal = false;
        this.manuals = false;
        this.descarga = false;
        break;
      case 2:
        this.miniatura = false;
        this.principal = true;
        this.manuals = false;
        this.descarga = false;
        break;
      case 3:
        this.miniatura = false;
        this.principal = false;
        this.manuals = false;
        this.descarga = true;
        break;
      case 4:
        this.miniatura = false;
        this.principal = false;
        this.manuals = true;
        this.descarga = false;
        break;
      default:

        break;
    }
    
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    
    this.goBack.emit();
  }
  protected onSaveError() {
  }

  

  private createFromForm(): ProductoRequest {
    
    const producto={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      sortDescription: this.editForm.get(['sortDescription']).value,
      forSale: this.editForm.get(['forSale']).value,
      price: this.editForm.get(['price']).value,
      features: this.editForm.get(['features']).value
    };
    
    const productRequest={
      product: producto,
      profileImage: this.profileImage,
      mainImages: this.mainImages,
      file: this.fileToUpload,
      manuals: this.manuales
    };

    return productRequest;
  }

  

}
