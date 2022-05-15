import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Post } from '../interface/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  
  constructor(private afs: AngularFirestore) { 
    this.postCollection = this.afs.collection<Post>('post',ref => ref.orderBy('readStat'));
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const docId = a.payload.doc.id;
        return {docId, ...data };
      }))
    );
  }

  getPost() {
    return this.posts;
  }


}
