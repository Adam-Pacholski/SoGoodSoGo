import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interface/country';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UserMyListService } from 'src/app/services/user-my-list.service';



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
  baza:boolean = false;

  lenght:number = 0;
  lenght2:number = 0;

  lat: number = 51.124636;
  long: number = 14.682228;
  show: number = -1;
  zoom: number = 4;
  location: Object = {};

  docId:string='';

  krajElement: Country = {docID:'', name: '', lat: 0, long: 0, capital:''};
 

  krajList: Country[] = [];
  myCountryList: Country[] = [];

  constructor(private auth: AuthService,
    private cs: CountriesService,
    private userMyListS: UserMyListService
  ) { }

  ngOnInit(): void {

    this.user = this.auth.user;
    this.getCountiesList();
    this.getUserMyList();
    this.porownanie();
  }

  porownanie(){

for(let i = 0; i<this.lenght; i++){
     for(let j=0; j<this.lenght2; j++){
       console.log(i);
       if(this.krajList[i].name===this.myCountryList[j].name){
         this.krajList[i].list = true;
         console.log(j);
       }
     }
    }
  }

  getCountiesList(){
    this.cs.getCountries().subscribe(items => {     
      this.krajList = items;
      this.lenght = this.krajList.length;      
     })
     
  }

  getUserMyList(){
    this.userMyListS.getCountries().subscribe(items => {
      this.myCountryList = items;
      this.lenght2 = this.myCountryList.length;
    })
  }

  changePassword() {
    this.auth.changePassword();
  }

  openEdit() {
    this.edit = !this.edit;
  }


  mapLocation(i: number) {
    this.krajElement = this.krajList[i];
    this.lat = this.krajElement.lat;
    this.long = this.krajElement.long;
    console.log(this.krajList[i]);
  }

  openMyList() {

    this.wishlist = false;
    this.myList = true;
    this.countryList = false;
    this.baza = false;
  }

  openWishList() {
    this.wishlist = true;
    this.myList = false;
    this.countryList = false;
    this.baza = false;
  }

  openCountryList() {
    this.wishlist = false;
    this.myList = false;
    this.countryList = true;
    this.baza = false;
    console.log(this.lenght+"|"+this.lenght2);
    this.porownanie();
  }

  openBaza(){
    this.wishlist = false;
    this.myList = false;
    this.countryList = false;
    this.baza = true;

  }

  // --- dodawanie do bazy lista uzytkownika

  addToMyList(i:number){
    
    this.krajElement = this.krajList[i];
    this.userMyListS.addCountry(this.krajElement);
    console.log(this.krajElement);
    this.porownanie();
    this.openMyList();
  }

  // uzupelnianie bazy chwilowe
  addCountry(){
    this.cs.addCountry(this.krajElement);
  }

  editCountry(){
    this.cs.editCountries(this.krajElement);
  }

  deleteCountry(){
    this.cs.deleteCountry(this.krajElement);
  }

}
