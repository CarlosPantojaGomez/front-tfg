import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductoRequest } from 'src/app/interfaces/productRequest.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {
  
  fileToUpload: File | null = null;
  
  editForm = this.fb.group({
    name: [],
    description: [],
    price: [],
    profilePicture: [],
    mainPicture: []
  });
  
  constructor(
    private fb: FormBuilder,
    private productoService: ProductosService
    ) { }

  ngOnInit() {
  }

  save(){
    const productRequest = this.createFromForm();
    console.log(productRequest);
    
    this.subscribeToSaveResponse(this.productoService.nuevoProducto(productRequest));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      price: this.editForm.get(['price']).value,
    };

    const productRequest={
      product: producto,
      mainImages: this.editForm.get(['mainPicture']).value,
      profileImage: this.editForm.get(['profilePicture']).value,
      file: this.fileToUpload
    };

    return productRequest;
  }

  uploadFile(evt) {
    console.log(evt);
    
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this.handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  protected handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    console.log(btoa(binaryString));
    this.editForm.patchValue({
      profilePicture : 'data:image/webp;base64,' + btoa(binaryString)
    });
  }

  uploadMainFile(evt) {
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this.handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  protected handleReaderMainLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.editForm.patchValue({
      mainPicture : 'data:image/webp;base64,' + btoa(binaryString)
    });
  }

}
