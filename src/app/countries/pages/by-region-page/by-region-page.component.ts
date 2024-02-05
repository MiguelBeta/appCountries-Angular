import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {


  @Input()
  public countries: Country[] = [];

  constructor( private CountriesService : CountriesService ) {}

  searchByCountry( region: string ): void {
    this.CountriesService.searchCountry( region )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
