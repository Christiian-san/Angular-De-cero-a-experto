import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  
  pais !: Pais;
  translations : any[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
          switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
          tap(console.log)
        )

      .subscribe(pais => {
        this.pais = pais[0]

        Object.keys(pais[0].translations).map(key=>{
          this.translations.push(
            pais[0].translations[key].common
          )
        })
        
      });
  }
}
