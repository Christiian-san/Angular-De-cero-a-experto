import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse,Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private _apiKey   : string = 'pad6ZnJ2Mhs1Xlx0Owf4JXR3aHjexGm0'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'


  public resultados : Gif[] = [];

//  api.giphy.com/v1/gifs/search?api_key=pad6ZnJ2Mhs1Xlx0Owf4JXR3aHjexGm0&q=dragon ball z&limit=10

  constructor(private http : HttpClient){
    
    this._historial = JSON.parse(localStorage.getItem('historial')!)   || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)  || []

  }
  
  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {


    query = query.toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial',JSON.stringify(this._historial))

    }

    const params = new HttpParams()
                        .set('api_key',this._apiKey)
                        .set('limit','10')
                        .set('q',query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe( res => {

      this.resultados = res.data;

      localStorage.setItem('resultados',JSON.stringify(this.resultados))
    })
  }
}
