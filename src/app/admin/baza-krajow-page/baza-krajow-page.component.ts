import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interface/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-baza-krajow-page',
  templateUrl: './baza-krajow-page.component.html',
  styleUrls: ['./baza-krajow-page.component.scss']
})
export class BazaKrajowPageComponent implements OnInit {

  countriesList: Country[]= [];
  krajElement: Country = { docID: '', name: '', lat: 0, long: 0, capital: '' };

  show:boolean = true;

  lat:number = 0;
  long:number = 0;
  zoom:number = 10;

  constructor(private cs: CountriesService) { 
    this.getCountiesList()
  }

  ngOnInit(): void {
  }

  getCountiesList() {
    this.cs.getCountries().subscribe(items => {
      this.countriesList = items;
      
    })

  }

  mapLocationAll(i: number) {
    this.krajElement = this.countriesList[i];
    this.lat = Number(this.countriesList[i].lat);
    this.long = Number(this.countriesList[i].long);
    this.zoom = 6;


    // console.log(this.krajElement);
  }

  addCountry() {
    this.cs.addCountry(this.krajElement);
    this.krajElement = { docID: '', name: '', lat: 0, long: 0, capital: '' };
  }

  editCountry() {
    this.cs.editCountries(this.krajElement);
    this.krajElement = { docID: '', name: '', lat: 0, long: 0, capital: '' };
  }

  deleteCountry() {
    this.cs.deleteCountry(this.krajElement);
    this.krajElement = { docID: '', name: '', lat: 0, long: 0, capital: '' };
  }


}
