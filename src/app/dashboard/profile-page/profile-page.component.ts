import { Component, OnInit } from '@angular/core';
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
  baza: boolean = false;

  lenghtAll: number = 0;
  lenghtWishList: number = 0;
  lenghtMyList: number = 0;

  lat: number = 51.124636;
  long: number = 14.682228;
  show: number = -1;
  zoom: number = 4;
  location: Object = {};

  docId: string = '';

  krajElement: Country = { docID: '', name: '', lat: 0, long: 0, capital: '' };


  krajList: Country[] = [];
  myCountryList: Country[] = [];
  myWishList: Country[] = [];

  constructor(private auth: AuthService,
    private cs: CountriesService,
    private userMyListS: UserMyListService,
    private userWishList: UserWishListService
  ) {
    this.getCountiesList();
    this.getUserWishList();
    this.getUserMyList();

  }

  ngOnInit(): void {



    this.user = this.auth.user;
    console.log(this.user);

    this.porownanie();
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
      for(let k = 0; k<this.lenghtMyList; k++){
        if(this.krajList[i].name === this.myCountryList[k].name) {
          this.krajList[i].list = true;
        }
      }
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
    this.baza = false;
    // this.porownanie();
  }

  openWishList() {
    this.wishlist = true;
    this.myList = false;
    this.countryList = false;
    this.baza = false;
    // console.log(this.krajList);
    // this.porownanie();
  }

  openCountryList() {
    this.wishlist = false;
    this.myList = false;
    this.countryList = true;
    this.baza = false;
    // console.log(this.lenghtAll + "|" + this.lenghtWishList);
    this.porownanie();
  }

  openBaza() {
    this.wishlist = false;
    this.myList = false;
    this.countryList = false;
    this.baza = true;

  }

  // --- wszystkie kraje
  mapLocationAll(i: number) {
    this.krajElement = this.krajList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    // console.log(this.krajElement);
  }

  getCountiesList() {
    this.cs.getCountries().subscribe(items => {
      this.krajList = items;
      this.lenghtAll = this.krajList.length;
    })

  }

  addToWishList(i: number) {

    this.krajElement = this.krajList[i];
    this.userWishList.addCountry(this.krajElement);
    // console.log(this.krajElement);
    this.porownanie();
    this.openWishList();
  }
  // --- Lista zyczen krajow

  mapLocationWish(i: number) {
    this.krajElement = this.myWishList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    // console.log(this.krajElement);
  }
  

  getUserWishList() {
    this.userWishList.getCountries().subscribe(items => {
      this.myWishList = items;
      this.lenghtWishList = this.myWishList.length;
    })
  }

  removeFromWishList(i: number){
    this.userWishList.deleteCountry(this.myWishList[i]);
    this.porownanie();
  }

  // --- Lista odwiedzonych krajow
  mapLocationMyList(i: number) {
    this.krajElement = this.myCountryList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    // console.log(this.krajElement);
  }

  getUserMyList() {
    this.userMyListS.getCountries().subscribe(items => {
      this.myCountryList = items;
      this.lenghtMyList = this.myCountryList.length;
    })
  }

  addToMyList(i: number) {
    console.log(this.krajList[i]);
     this.userMyListS.addCountry(this.krajList[i]);

     this.getUserMyList();
     this.getUserWishList();
     try {
       this.removeFromWishList(i)
     } catch (error) {
       console.log('brak w bazie');
     }
     
    
    this.porownanie();
    this.openMyList();
  }

  // uzupelnianie bazy chwilowe
  addCountry() {
    this.cs.addCountry(this.krajElement);
  }

  editCountry() {
    this.cs.editCountries(this.krajElement);
  }

  deleteCountry() {
    this.cs.deleteCountry(this.krajElement);
  }

}
