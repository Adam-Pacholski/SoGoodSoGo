import { LocalizedString } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';

import { map, Observable } from 'rxjs';
import { Country } from '../interface/country';
import { User } from '../interface/user';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserWishListService {

  countriesColection!: AngularFirestoreCollection<Country>;
  
  countriesList!: Observable<Country[]>;
  item: string | null;
  

  constructor(private afs: AngularFirestore, private messageService: MessageService) {
    this.item = localStorage.getItem('uid');
    this.getList();
    }

  getList(){
    
    // console.log(uid);
  const ref = this.afs.collection('users').doc(String(this.item));
  this.countriesColection = ref.collection('wishList', ref => ref.orderBy('name'));
  this.countriesList = this.countriesColection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Country;
      const docId = a.payload.doc.id;
      return { docId, ...data };
    }))
  );
 }

 getCountries() {
    return this.countriesList;
 }

 test(data: Country) {
   console.log(data.capital);
 }

 addCountry(data: Country) {
   const newId = this.afs.createId();
   this.countriesColection.doc(newId).
     set({ docID: newId, name: data.name, lat: data.lat, long: data.long, capital: data.capital }).then(() => {
      this.messageService.succes("Pomyślnie zapisano kraj " + data.name + " do listy życzeń");
    }).catch((err: FirebaseError) => {
     this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });
 }

 editCountries(data: Country) {
  // console.log(data.docID);
   this.countriesColection.doc(data.docID).
     update({ docID: data.docID, name: data.name, lat: data.lat, long: data.long, capital: data.capital });
 }

 deleteCountry(data: Country) {
  const ref = this.afs.collection('users').doc(String(this.item));
  this.countriesColection = ref.collection('wishList');

  this.countriesColection.doc(data.docID).delete().then(() => {
    this.messageService.succes("Pomyślnie usunięto kraj: " + data.name + " z Twojej listy życzeń" );
  }).catch((err: FirebaseError) => {
   this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
  });
 }
}
