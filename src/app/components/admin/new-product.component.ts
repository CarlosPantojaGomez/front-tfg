import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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

  @Input() id: number;

  @ViewChild('myInputMiniatura')
  myInputVariableMiniatura: ElementRef;

  @ViewChild('myInputMainImages')
  myInputVariableMainImages: ElementRef;

  @ViewChild('myInputFile')
  myInputVariableFile: ElementRef;
  
  @ViewChild('myInputManuales')
  myInputVariableManuales: ElementRef;
  buttonDone: string;
  
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
    description: [],
    features: [],
    price: []
  });
  
  constructor(
    private fb: FormBuilder,
    private productoService: ProductosService
    ) { }

  ngOnInit() {
    this.edit = false;
    this.miniatura = true;
    
    this.buttonDone = 'Crear';
    if(this.id != undefined){
      this.productoService.getProducto(this.id.toString(10)).subscribe(data =>{
        this.edit = true;
        this.editForm.patchValue({
          name: data.body.name,
          description: data.body.description,
          features: data.body.features,
          price: data.body.price
        });

        this.profileImage = data.body.profileImage;
        this.buttonDone = 'Guardar';
        
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
        console.log(file);
        
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
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

  eliminarMainPicture(id: number) {
    this.profileImage = null;
    let indexx = this.mainImages.findIndex(x => x.id$ === id);

    this.mainImages.forEach((element,index)=>{
      if(index==indexx) this.mainImages.splice(index,1);
    });
  }

  eliminarDescarga() {
    this.fileToUpload = undefined;
  }

  eliminarManual(name: string) {
    this.manuales = [];
    let indexx = this.manuales.findIndex(x => x.name === name);

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
    console.log("CREADO");
  }
  protected onSaveError() {
    console.log("ERROR");
  }

  

  private createFromForm(): ProductoRequest {

    const producto={
      id: this.edit ? this.id : null,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
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
