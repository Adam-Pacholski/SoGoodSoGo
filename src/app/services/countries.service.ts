import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { map, Observable } from 'rxjs';
import { Country } from '../interface/country';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  countriesColection!: AngularFirestoreCollection<Country>;
  countriesList: Observable<Country[]>;
  lenght: number = 0;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {

    this.countriesColection = this.afs.collection<Country>('countries', ref => ref.orderBy('name'));
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
      set({ docID: newId, name: data.name, lat: data.lat, long: data.long, capital: data.capital }).then(data => {
        this.messageService.succes("Pomyślnie dodano nowy Kraj");
      }).catch((err: FirebaseError) => {
       this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
      });;
  }

  editCountries(data: Country) {
   // console.log(data.docID);
    this.countriesColection.doc(data.docID).
      update({ docID: data.docID, name: data.name, lat: data.lat, long: data.long, capital: data.capital }).then(() => {
        this.messageService.succes("Pomyślnie edytowano kraj");
      }).catch((err: FirebaseError) => {
       this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
      });;
  }

  deleteCountry(data: Country) {
    this.countriesColection.doc(data.docID).delete().then(data => {
      this.messageService.succes("Pomyślnie usunięto kraj z listy");
    }).catch((err: FirebaseError) => {
     this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });;
  }

}
