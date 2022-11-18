import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  id: string;
  usuario: Usuario;
  header: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
    this.route.params.subscribe( parametros =>{
      this.id = parametros['id']; 
    });

    this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.header = 'Datos';
    if (this.authenticationService.confirmSession(parseInt(this.id)) ) {

    } else {
      this.router.navigate(['/login']);
    }
  }
  
  public changeHeader(tag: string){
    this.header = tag;
  }

}
