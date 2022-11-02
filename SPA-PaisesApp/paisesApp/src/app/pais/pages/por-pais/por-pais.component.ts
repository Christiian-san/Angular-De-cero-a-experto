import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor:pointer
    }
  `]
})
export class PorPaisComponent {

  termino : string = '';
  isError : boolean = false;
  mostrarSugerencias : boolean = false;
  paises : Pais[] = [];
  paisesSugeridos : Pais[] = [];

  constructor( private paisService : PaisService){ }

  buscar( termino : string ){
    this.isError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(termino)
    .subscribe(
       paises =>{
        this.paises = paises;
        console.log(paises)
       }, err =>{
        this.isError = true;
        this.paises = [];
       })

  }

  sugerencias( termino : string){
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino).subscribe(
      paises => this.paisesSugeridos = paises.splice(0,5)
      , err => this.paisesSugeridos = [])
  }

}
