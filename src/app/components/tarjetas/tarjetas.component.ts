import { Component, OnInit } from '@angular/core';
import {NoticiasService} from "../../services/noticias.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/interfaces/noticia.interface';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html'
})
export class TarjetasComponent implements OnInit {

  noticias: Noticia[]

  constructor(
    private productosService:NoticiasService,
    private router:Router) { }

  ngOnInit() {
    this.productosService.getNoticias().subscribe(data =>{
      this.noticias=data.body;
    })
  }

  verNoticia(key:string){
    this.router.navigate(['/noticia', key])
    
  }



}
