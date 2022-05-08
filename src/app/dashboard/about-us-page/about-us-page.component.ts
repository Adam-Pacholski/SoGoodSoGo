import { AgmMap } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Country } from 'src/app/interface/country';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent implements OnInit {

  lat: number = 51.124636;
  long: number = 14.682228;
  show: number = -1;
  zoom: number = 4;
  location: Object = {};

  krajElement: Country = { id: '', name: '', lat: 0, long: 0 };

  krajList: Country[] = [
    {
      id: '1',
      name: 'Polska',
      lat: 52.24263327860678,
      long: 21.016628300106788
    },
    {
      id: '2',
      name: 'Niemcy',
      lat: 52.519088881828786,
      long: 13.402409746966745
    },
    {
      id: '3',
      name: 'Francja',
      lat: 48.85669709900454,
      long: 2.3523544191980177

    },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  collapse(i: number) {
    this.krajElement = this.krajList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    if (this.show === i) {
      this.show = -1;
      this.krajElement = { id: '', name: '', lat: 0, long: 0 };
    } else {
      this.show = i;
    }
  }
}
