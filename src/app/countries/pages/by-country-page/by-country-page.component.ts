import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  @Input()
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private countriesService : CountriesService ) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry( pais: string ): void {
    this.countriesService.searchCountry( pais )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
