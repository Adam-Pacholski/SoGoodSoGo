import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Country } from 'src/app/interface/country';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UserMyListService } from 'src/app/services/user-my-list.service';
import { UserWishListService } from 'src/app/services/user-wish-list.service';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User = { id: '', name: '', surname: '', email: '', stat: false };
  edit: boolean = false;

  countryList: boolean = false;
  wishlist: boolean = false;
  myList: boolean = true;
  
  lenghtAll: number = 0;
  lenghtWishList: number = 0;
  lenghtMyList: number = 0;

  lat: number = 51.124636;
  long: number = 14.682228;
  show: number = -1;
  zoom: number = 15;
  location: Object = {};

  docId: string = '';

  krajElement: Country = { docID: '', name: '', lat: 0, long: 0, capital: '' };

  searchTerm: string = '';
  searchKrajList: Country[] = [];
  krajList: Country[] = [];
  myCountryList: Country[] = [];
  myWishList: Country[] = [];

  constructor(private auth: AuthService,
    private cs: CountriesService,
    private userMyListS: UserMyListService,
    private userWishList: UserWishListService,
    private mapsAPILoader: MapsAPILoader,
  ) {
    
    this.getAllList();
  }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();
    });
    this.user = this.auth.user;
   // console.log(this.user);

    this.porownanie();
  }

  search(value: string): void {
    this.searchKrajList = this.krajList.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  getAllList(){
    this.getCountiesList();
    this.getUserWishList();
    this.getUserMyList();
    
  }

  porownanie() {

    for (let i = 0; i < this.lenghtAll; i++) {
      for (let j = 0; j < this.lenghtWishList; j++) {
        // console.log(i);
        if (this.krajList[i].name === this.myWishList[j].name) {
          this.krajList[i].wish = true;

          // console.log(j);
        }

      }
      for (let k = 0; k < this.lenghtMyList; k++) {
        if (this.krajList[i].name === this.myCountryList[k].name) {
          this.krajList[i].list = true;
        }
      }
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

  // --- Uzytkownik

  openEdit() {
    this.edit = !this.edit;
  }
  changePassword() {
    this.auth.changePassword();
  }

  // ---


  // --- menu list
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

    this.porownanie();
  }

  openBaza() {
    this.wishlist = false;
    this.myList = false;
    this.countryList = false;


  }

  // --- wszystkie kraje
  mapLocationAll(i: number) {
    
    this.lat = Number(this.searchKrajList[i].lat);
    this.long = Number(this.searchKrajList   [i].long);
    this.zoom = 6;


    // console.log(this.krajElement);
  }

  getCountiesList() {
    this.cs.getCountries().subscribe(items => {
      this.krajList = items;
      this.searchKrajList = items;
      this.lenghtAll = this.krajList.length;
    })

  }

  clickTest(){
    
  }

  addToWishList(i: number) {

    this.userWishList.addCountry(this.searchKrajList[i]);
    // console.log(this.krajElement);
    this.getAllList();
    this.porownanie();
    this.openWishList();
  }
  // --- Lista zyczen krajow

  mapLocationWish(i: number) {
    this.lat = Number(this.myWishList[i].lat);
    this.long = Number(this.myWishList[i].long);
    this.zoom = 6;
  }


  getUserWishList() {
    this.userWishList.getCountries().subscribe(items => {
      this.myWishList = items;
      this.lenghtWishList = this.myWishList.length;
    })
  }

  removeFromWishList(i: number) {
    this.userWishList.deleteCountry(this.myWishList[i]);
    this.getAllList();
    this.porownanie();
  }

  // --- Lista odwiedzonych krajow
  mapLocationMyList(i: number) {
    
    this.lat = Number(this.myCountryList[i].lat);
    this.long = Number(this.myCountryList[i].long);
    this.zoom = 6;
  }

  getUserMyList() {
    this.userMyListS.getCountries().subscribe(items => {
      this.myCountryList = items;
      this.lenghtMyList = this.myCountryList.length;
    })
  }

  addToMyListFromKrajList(i: number) {
    
    this.userMyListS.addCountry(this.searchKrajList[i]);

    this.getAllList();
    try {
      this.removeFromWishList(i)
    } catch (error) {
      console.log('brak w bazie');
    }

    this.porownanie();
    this.openMyList();
  }

  addToMyList(i: number) {
    
    this.userMyListS.addCountry(this.myWishList[i]);

    this.getAllList();
    try {
      this.removeFromWishList(i)
    } catch (error) {
      console.log('brak w bazie');
    }

    this.porownanie();
    this.openMyList();
  }

  removeFromList(i: number){
    this.userMyListS.deleteCountry(this.myCountryList[i]);
    this.getAllList();
    this.porownanie();
  }

  editUser(){
    // console.log(this.user.name + " " + this.user.surname);
    this.auth.editNameSurnameUser(this.user);
    this.edit = false;
  }
}
