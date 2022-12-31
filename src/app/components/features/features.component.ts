import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductComment } from 'src/app/interfaces/productComment.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  @Input() product: Producto;

  usuario: Usuario;
  logeado: boolean;
  comprado: boolean;

  commentForm= this.fb.group({
    text: [],
  });

  constructor(
    private productService: ProductosService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){

      this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
      this.logeado = true;

      if(this.usuario.productsBought != undefined && this.usuario.productsBought != null && this.usuario.productsBought.length > 0){
        const prod= this.usuario.productsBought.find(obj => {
          return obj.id === this.product.id
        });

        if(prod != null && prod != undefined){
          this.comprado = true;
        }
      }
      
    }
  }

  writeComment(){
    
    const comment = this.createCommentFromForm();

    this.subscribeCommentWriteToSaveResponse(this.productService.writeComment(comment));
  }
  
  private createCommentFromForm(): ProductComment {

    var creatorId;

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      creatorId = JSON.parse(sessionStorage.getItem('currentUser')).id
    }

    const creator={
      id: creatorId
    };

    const taskComment={
      text: this.commentForm.get(['text']).value,
      product: this.product,
      creator: creator
    };
    
    return taskComment;
  }

  protected subscribeCommentWriteToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onCommentWriteSaveSuccess(res), (res: HttpErrorResponse) => this.onCommentWriteSaveError());
  }

  protected onCommentWriteSaveSuccess(res: any) {

    this.commentForm.patchValue({
      text: "",
    });

    if(this.product != undefined && this.product != null){
      this.productService.getProducto(this.product.id.toString(10)).subscribe(data =>{
        this.product = data.body;
      });
    }

  }
  protected onCommentWriteSaveError() {
  }

}
