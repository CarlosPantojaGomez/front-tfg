import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FormBuilder } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { NO_PROFILE_PICTURE } from '../../helpers/img.constants';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit {
  @Input() id: string;

  usuario: Usuario;
  userType: String;

  countries: any[];
  profileImage = NO_PROFILE_PICTURE;

  editForm = this.fb.group({
    name: [],
    firstLastName: [],
    secondLastName: [],
    profilePicture: [],
    tlf: [],
    country: [],
    city: [],
    address: [],
    zipcode: []
  });

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {

    this.countries = ['España', 'Alemania'];

    this.usuarioService.getusuario(this.id)
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
        
  }

  protected loadData(usuario: Usuario) {
    console.log(usuario);
    
    this.usuario = usuario;
    this.userType = this.usuarioService.convertTypeToText(this.usuario.userType);
    this.usuario.profilePicture != null ? this.profileImage = this.usuario.profilePicture : undefined;
    this.updateForm(usuario);
  }

  updateForm(usuario: Usuario) {
    this.editForm.patchValue({
      name: usuario.name,
      firstLastName: usuario.firstLastName,
      secondLastName: usuario.secondLastName,
      profilePicture: usuario.profilePicture,
      tlf: usuario.tlf,
      city: usuario.city,
      address: usuario.address,
      zipcode: usuario.zipcode,
    });
  }

  protected onError(errorMessage: string) {
    
  }

  private createFromForm(): Usuario {
    const usuario={
      id: this.usuario.id,
      name: this.editForm.get(['name']).value,
      firstLastName: this.editForm.get(['firstLastName']).value,
      secondLastName: this.editForm.get(['secondLastName']).value,
      email: this.usuario.email,
      nickname: this.usuario.nickname,
      password: this.usuario.password,
      userType: this.usuario.userType,
      profilePicture: this.profileImage != null ? this.profileImage : undefined,
      city:  this.editForm.get(['city']).value,
      tlf:  this.editForm.get(['tlf']).value,
      address:  this.editForm.get(['address']).value,
      zipcode:  this.editForm.get(['zipcode']).value,
      flagActive: 1
    };
    return usuario;
  }

  handleFileSelect(evt){
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
    
    this.profileImage= 'data:image/webp;base64,' + btoa(binaryString);
   }

   public save() {
    const user = this.createFromForm();
    this.subscribeToSaveResponse(this.usuarioService.actualizarUsuario(user));
   }

   protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.alertService.showAlert("Usuario actualizado correctamente");
  }
  protected onSaveError() {
    console.log("ERROR");
  }

  public changeCountry() {

  }
}