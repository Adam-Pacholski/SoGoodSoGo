import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interface/country';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User = { id: '', name: '', surname: '', email: '' };
  edit: boolean = false;

  countryList: boolean = false;
  wishlist: boolean = false;
  myList: boolean = true;

  lenght:number = 0;

  lat: number = 51.124636;
  long: number = 14.682228;
  show: number = -1;
  zoom: number = 4;
  location: Object = {};

  docId:string='';

  krajElement: Country = {docID:'', id: 0, name: '', lat: 0, long: 0, capital:''};

  krajList: Country[] = [];

  constructor(private auth: AuthService,
    private cs: CountriesService
  ) { }

  ngOnInit(): void {

    this.user = this.auth.user;
    this.getCountiesList();
    

  }

  getCountiesList(){
    this.cs.getCountries().subscribe(items => {
      this.krajList = items;
      this.lenght = this.krajList.length;
      console.log(this.lenght);
    })
  }

  changePassword() {
    this.auth.changePassword();
  }

  openEdit() {
    this.edit = !this.edit;
  }


  collapse(i: number) {
    this.krajElement = this.krajList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    if (this.show === i) {
      this.show = -1;
      this.krajElement = {docID:'', id: 0, name: '', lat: 0, long: 0, capital:''};
    } else {
      this.show = i;
    }
  }

  openMyList() {

    this.wishlist = false;
    this.myList = true;
    this.countryList = false;
  }

  openWishList() {
    this.wishlist = true;
    this.myList = false;
    this.countryList = false;
  }

  openCountryList() {
    this.wishlist = false;
    this.myList = false;
    this.countryList = true;
  }

}
