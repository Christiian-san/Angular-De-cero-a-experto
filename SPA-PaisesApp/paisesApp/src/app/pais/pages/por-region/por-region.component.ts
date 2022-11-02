import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `button{
      margin-right : 5px
    }`
  ]
})
export class PorRegionComponent{

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva : string = '';
  paises: Pais[] = [];
  isError: boolean = false;
  constructor( private paisService : PaisService ) { }

  activarRegion(region:string){
    this.regionActiva = region;
    this.paisService.buscarRegion(region).subscribe((paises)=>{
      this.paises = paises
      console.log(paises);
    },(error)=>{
        this.isError = true;
        this.paises = [];
    })
  }

  getClaseCss(region : string):string{
    return region==this.regionActiva ? 'btn btn-primary' : 'btn btn-outline-primary'
  }
}
