import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html'
})
export class NewUserComponent implements OnInit {
    
    @Input() type: number;
    @Output() goBack = new EventEmitter();
    usuario: Usuario;
    header: string;

    typing: boolean;
    modal: boolean;

    editForm = this.fb.group({
      name: [],
      firstLastName: [],
      secondLastName: [],
      email: [],
      nickname: [],
      password: [],
      userType: []
    });

    constructor(
      private fb: FormBuilder,
      private usuarioService: UsuariosService,
      private router: Router
    ) { }

  ngOnInit() {
    this.header = 'Usuarios';
    this.modal = false;
    
    this.editForm.get(['nickname']).disable();
    this.editForm.get(['password']).disable();
    this.typing = true;
    
  }

  save(){
    const user = this.createFromForm();
    this.subscribeToSaveResponse(this.usuarioService.create(user));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.goBack.emit();
  }
  protected onSaveError() {
  }

  private createFromForm(): Usuario {
    const usuario={
      name: this.editForm.get(['name']).value,
      firstLastName: this.editForm.get(['firstLastName']).value,
      secondLastName: this.editForm.get(['secondLastName']).value,
      email: this.editForm.get(['email']).value,
      nickname: this.editForm.get(['nickname']).value,
      password: this.editForm.get(['password']).value,
      userType: this.type,
      flagActive: 1
    };
    return usuario;
  }

  protected loadData() {
  }

  protected onError(errorMessage: string) {
    
  }

  protected modalTrue() {
    this.modal = true;
  }

  protected changeHeader(tag: string){
    this.header = tag;
  }

  protected newClient() {
    this.router.navigate(['/registrarse','nuevo']);
  }

  public setTyping(){ 
    
    this.typing = true;
  }

  public checkInput(value: any, input: string, disable: string[]) {
    this.usuarioService.getUsuarioBy(value, input).subscribe(res => this.decideDisable(disable, res.body));
  }

  protected decideDisable(disable: string[], result: any) { 
    
    if(result == null || result.length == 0) {
      this.editForm.get([disable[0]]).enable();
    } else {
      disable.forEach(element =>
        this.setDisable(element)
      );
    }
    this.typing = false;
  }

  protected setDisable(input: string ) {
    this.editForm.get([input]).disable();
    this.editForm.patchValue({ [input]: null })
  }

  protected deleteUser(value: any) {
    this.usuarioService.borrarUsuario(value).subscribe(data =>{
        this.loadData();
        
    });
    
  }

}