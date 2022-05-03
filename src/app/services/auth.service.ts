import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  ActivatedRoute, Router } from '@angular/router';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Boolean = false; 
  userID: any;
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

  async signup(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(async res => {
        this.isLogged = true;
        this.userID = res.user?.uid;
        localStorage.setItem('user', this.userID);
       // this.creatUser(this.userID, email);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'],{relativeTo:this.route});
      })
  }

  creatUser(uid: string, email:string){
    this.db.collection('users').doc<User>(uid).set({email: email});
  }

}
