import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  @Input()
  public countries: Country[] = [];

  constructor( private CountriesService : CountriesService ) {}

  searchByCountry( pais: string ): void {
    this.CountriesService.searchCountry( pais )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
