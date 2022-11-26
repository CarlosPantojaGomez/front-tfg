import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }
  `]
})
export class RegistrarseComponent {
  
  typing: boolean;

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
    private router:Router
    ) { } 

    ngOnInit() {
      this.editForm.get(['nickname']).disable();
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
      this.router.navigate(['/login']);
    }
    protected onSaveError() {
      console.log("ERROR");
    }

    public setTyping(){ 
      console.log('true');
      
      this.typing = true;
    }

    public checkInput(value: any, input: string, disable: string[]) {
      this.usuarioService.getUsuarioBy(value, input).subscribe(res => this.decideDisable(disable, res.body));
    }
    
    protected decideDisable(disable: string[], result: any) { 
      console.log(result);
      console.log(disable[0]);
      if(result.length == 0) {
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

    private createFromForm(): Usuario {
      const usuario={
        name: this.editForm.get(['name']).value,
        firstLastName: this.editForm.get(['firstLastName']).value,
        secondLastName: this.editForm.get(['secondLastName']).value,
        email: this.editForm.get(['email']).value,
        nickname: this.editForm.get(['nickname']).value,
        password: this.editForm.get(['password']).value,
        userType: 1,
        flagActive: 1
      };
      return usuario;
    }
}
