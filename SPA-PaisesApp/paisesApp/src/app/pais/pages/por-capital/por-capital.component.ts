import { Component} from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino : string = '';
  isError : boolean = false;
  paises : Pais[] = []



  constructor( private paisService : PaisService){ }

  buscar( termino : string ){
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino)
    .subscribe(
       paises =>{
        this.paises = paises;
        console.log(paises)
       }, err =>{
        this.isError = true;
        this.paises = [];
       })

  }

}
