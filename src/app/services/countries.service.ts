import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Country } from '../interface/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  countriesColection!: AngularFirestoreCollection<Country>;
  countriesList: Observable<Country[]>;

  constructor(private afs: AngularFirestore) {

    this.countriesColection = this.afs.collection<Country>('countries', ref => ref.orderBy('id'));
    this.countriesList = this.countriesColection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Country;
        const docId = a.payload.doc.id; 
        //console.log(this.countriesList);
        return { docId, ...data };
      }))
    );
  }

  getCountries(){
    return this.countriesList;
  }

  test(data: Country){
    console.log(data.capital);
  }

}
