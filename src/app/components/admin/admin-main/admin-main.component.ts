import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/Activity.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ActivityService } from 'src/app/services/activity.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  activities: Activity[];
  usuario: Usuario;

  constructor(
    private activityService: ActivityService,
    private usuarioService: UsuariosService) { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){

      this.activityService.getActivitiesByUserId(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        console.log(data.body);
        this.activities = data.body;
       
        
      });

      this.usuarioService.getusuario(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        console.log(data.body);
        this.usuario = data.body;
       
        
      });
    }
  }

}
