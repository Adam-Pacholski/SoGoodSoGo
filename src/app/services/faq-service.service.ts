import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { map, Observable } from 'rxjs';
import { FaqList } from '../interface/faqListInterface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FaqServiceService {

  faqCollection!: AngularFirestoreCollection<FaqList>;
  faqs: Observable<FaqList[]>;

  constructor(private afs: AngularFirestore, private messageService: MessageService) {
    
    this.faqCollection = this.afs.collection<FaqList>('FAQ',ref => ref.orderBy('id'));
    this.faqs = this.faqCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FaqList;
        const docId = a.payload.doc.id;
        return {docId, ...data };
      }))
    );
    
  }

  getFaq() {
    return this.faqs;
    
  }

  addFaq(data: FaqList) {
   const newId = this.afs.createId();
   this.faqCollection.doc(newId).set({docID: newId ,id: data.id, question: data.question, answer: data.answer}).then(data => {
     this.messageService.succes("Dodano nowy FAQ");
   }).catch((err: FirebaseError) => {
    this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
   });
  }

  editFaq(data: FaqList){
    this.faqCollection.doc(data.docID).update({docID: data.docID ,id: data.id, question: data.question, answer: data.answer}).then(data => {
      this.messageService.succes("Pomyślnie edytowano FAQ");
    }).catch((err: FirebaseError) => {
     this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });
  }
  

  deleteFaq(data: FaqList){
    this.faqCollection.doc(data.docID).delete().then(data => {
      this.messageService.succes("Usunięto FAQ");
    }).catch((err: FirebaseError) => {
     this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });;
  }
}
