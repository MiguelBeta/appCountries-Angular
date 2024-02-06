import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interfaces';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital : { term: '', countries: [] },
    byCountries : { term: '', countries: [] },
    byRegion : { region: '', countries: [] }

  }


  constructor( private http: HttpClient ) {
    //Carga la informacion almacenada en el cache
    this.loadFromLocalStorage();
  }

  //Funcion que almacena la infomracion despues de actu. la pag.
  private saveLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore ));
  }

  //Funcion que carga la informacion almacenada despues de actu. la pag.
  private loadFromLocalStorage(){
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore' )! );
  }


  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      //Analiza el error y devuelve lo que mostremos en pantalla
      catchError( () => of([]) ),
      // delay(2000),
    );
  }



  searchCountryByAlphaCode( code: string ): Observable<Country | null>{

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
          //Analiza el error y devuelve lo que mostremos en pantalla
          catchError( () => of(null) )
        );

  }

  searchCapital( term: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCapital = { term, countries }),
          tap( () => this.saveLocalStorage() ),
          );
  }

  searchCountry( term: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries }),
        tap( () => this.saveLocalStorage() ),

        );

  }

  searchRegion( region: Region ): Observable<Country[]>{

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap( () => this.saveLocalStorage() ),

        );

  }



}
