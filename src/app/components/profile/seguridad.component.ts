import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html'
})
export class SeguridadComponent implements OnInit {
  @Input() id: string;
  typing: boolean;
  usuario: Usuario;
  editForm = this.fb.group({
    oldPassword: [],
    newPassword1: [],
    newPassword2: []
  });
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.editForm.get(['newPassword1']).disable();
    this.editForm.get(['newPassword2']).disable();

    this.typing = true;
    this.usuarioService.getusuario(this.id)
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }

  protected loadData(usuario: Usuario) {
    console.log(usuario);
    
    this.usuario = usuario;
  }
  protected onError(errorMessage: string) {
    
  }

  public checkInput(value: any, disable: string[]) {
    this.authenticationService.validateCredentials(this.usuario.nickname, value).subscribe(
      (res: HttpResponse<Usuario>) => this.decideDisable(disable, res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected decideDisable(disable: string[], result: any) { 
    console.log(result);
    
    if(result == null) {
      disable.forEach(element =>
        this.setDisable(element)
      );
    } else {
      disable.forEach(element =>
        this.editForm.get(element).enable()
      );
    }
    this.typing = false;
  }

  protected setDisable(input: string ) {
    this.editForm.get([input]).disable();
    this.editForm.patchValue({ [input]: null })
  }
  
  public setTyping() { 
    console.log('true');
    
    this.typing = true;
  }

  public submit() {
    const user = this.usuario;

    user.password = this.editForm.get(['newPassword2']).value

    this.subscribeToSaveResponse(this.usuarioService.actualizarUsuario(user));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log("GUARDADO");
  }
  protected onSaveError() {
    console.log("ERROR");
  }

}