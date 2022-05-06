import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";


@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent implements OnInit {


  user: User = { id: '', name: '', surname: '', email: '' };
  isLogged: Boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {


    const _auth = getAuth();
    onAuthStateChanged(_auth, (a) => {
    if (a) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = a.uid;
      
      this.auth.getUser(uid);
      this.auth.isLogged = true;
      this.isLogged = this.auth.isLogged;
      this.user = this.auth.user;
      console.log(a);
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

    // if(this.auth.isLogged == false){
    //   localStorage.clear();
    //   //this.auth.logout();
    //   this.isLogged = false;
    // } else{
    //   this.isLogged = true;
    //   this.user = this.auth.user;
    // } 
  }



  logOut() {


    this.auth.logout();
    // this.auth.isLogged = false;
    // localStorage.clear();
    this.isLogged = false;
  }
}

