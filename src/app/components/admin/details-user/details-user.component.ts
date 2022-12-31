import { Component, OnInit, Input} from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NO_PROFILE_PICTURE } from 'src/app/helpers/img.constants';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  @Input() id: number;
  usuario: Usuario;
  userType: String;

  profileImage = NO_PROFILE_PICTURE;

  constructor(
    private usuarioService: UsuariosService,
    private projectervice: ProjectService) { }

  ngOnInit(): void {
    this.usuarioService.getusuario(this.id.toString(10))
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }
  
  protected loadData(usuario: Usuario) {
    
    this.usuario = usuario;
    this.userType = this.usuarioService.convertTypeToText(this.usuario.userType);
    this.usuario.profilePicture != null ? this.profileImage = this.usuario.profilePicture : undefined;
  }

  protected onError(errorMessage: string) {
    
  }

}
