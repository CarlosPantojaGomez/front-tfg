import { Component, OnInit , Input} from '@angular/core';
import {NoticiasService} from "../../services/noticias.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/interfaces/noticia.interface';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html'
})
export class TarjetasComponent implements OnInit {

  @Input() id: number;
  noticias: Noticia[]

  constructor(
    private productosService:NoticiasService,
    private router:Router) { }

  ngOnInit() {
    if(this.id != undefined && this.id != null){
      this.productosService.getNoticiasByProductId(this.id.toString(10)).subscribe(data =>{
        this.noticias=data.body;
      });
    } else {
      this.productosService.getNoticias().subscribe(data =>{
        this.noticias=data.body;
      });
    }
  }

  verNoticia(key:string){
    this.router.navigate(['/noticia', key])
  }



}
