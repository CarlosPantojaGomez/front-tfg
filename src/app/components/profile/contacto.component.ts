import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit {
  @Input() id: string;
  usuario: Usuario;
  options: any[];
  editForm = this.fb.group({
    motivo: [null, [Validators.required]],
    text: [null, [Validators.required]],
  });
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.options = ['Petición Software', 'Consulta'];
    this.usuarioService.getusuario(this.id)
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }

  protected loadData(usuario: Usuario) {
    
    this.usuario = usuario;
  }

  protected onError(errorMessage: string) {
    
  }

  public submit() {
    
    
    let subject =  this.editForm.get(['motivo']).value;
    let text = this.editForm.get(['text']).value + '\n'
    + 'USUARIO: ' + this.usuario.nickname + '\n'
    + 'CORREO: ' + this.usuario.email ;
    
    this.subscribeToSaveResponse(this.usuarioService.sendMail(subject, text));
    
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
  }
  protected onSaveError() {
  }

  public changeOption(event: any) {
    
  }

}