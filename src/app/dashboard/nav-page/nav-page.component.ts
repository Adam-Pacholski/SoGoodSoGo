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
    
      const uuid: string = a.uid;
      this.auth.getUser(uuid)
      this.auth.isLogged = true;
      this.isLogged = this.auth.isLogged;
      this.user = this.auth.user;
     // console.log(this.user);

    } else {
      // User is signed out
      // ...
    }
  });
  }

  logOut() {

    this.auth.logout();
    this.isLogged = false;
  }
}

