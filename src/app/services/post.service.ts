import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { map, Observable } from 'rxjs';
import { Post } from '../interface/post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  constructor(private afs: AngularFirestore, private messageService: MessageService) {
    this.postCollection = this.afs.collection<Post>('post', ref => ref.orderBy('readStat'));
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    );
  }

  getPost() {
    return this.posts;
  }

  createPost(data: Post) {
    const newId = this.afs.createId();
    this.postCollection.doc(newId).set({ docID: newId, email: data.email, name: data.name, surname: data.surname, message: data.message, readStat: data.readStat })
    .then(data => {
      this.messageService.succes("Dziękujemy!! Pomyślnie wysłano wiadomość");
    }).catch((err: FirebaseError) => {
     this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });;
  }

  changeReadStat(data: Post){
    this.postCollection.doc(data.docID).update({readStat: true});
  }

}
