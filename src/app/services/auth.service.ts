import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {  ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../interface/user';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Boolean = false; 
  userID: any;
  user:User = {id:'',name:'',surname:'',email:''};
  userRef?: AngularFirestoreDocument<User>;

  constructor(
    private auth: AngularFireAuth, 
    private router: Router,
    private db: AngularFirestore,
    private route: ActivatedRoute
    ) 
    {}

  test(){
    this.isLogged = true;
    console.log(this.isLogged);
    localStorage.setItem('user','adam');
  }

  // logowanie
  async signin(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.userID = res.user?.uid;
        localStorage.setItem('user', this.userID);
        this.getUser(this.userID);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'],{relativeTo:this.route});
        this.db.collection('users');
      });

  }

  // rejestracja
  async signup(user: User, password: string) {
    await this.auth.createUserWithEmailAndPassword(user.email, password)
      .then(async res => {
        this.isLogged = true;
        this.user = user;
        console.log(this.user);
        this.userID = res.user?.uid;
        this.user.id = this.userID;
        localStorage.setItem('user', this.userID);
        this.creatUser(this.userID, user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'],{relativeTo:this.route});
      })
  }

  creatUser(uid: string, user: User){
    this.db.collection('users').doc<User>(uid).set({email: user.email, name: user.name, surname: user.surname});
  }

  logout() {
    this.auth.signOut();
    localStorage.clear;
    this.isLogged = false;
    this.user = {id:'',name:'',surname:'',email:''};
    this.router.navigate([''])
  }

  getUser(uid: string){
    
    this.userRef = this.db.doc('users/' + uid);
    this.userRef.snapshotChanges().pipe(
      map(res => ({id:res.payload.id,...res.payload.data() as User})))
      .subscribe(data => {
        this.user.id = data.id;
        this.user.email = data.email;
        this.user.name = data.name;
        this.user.surname = data.surname;

        //console.log(this.user);
      })  
  }

  changePassword(){
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.user.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error: { code: any; message: any; }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

}
