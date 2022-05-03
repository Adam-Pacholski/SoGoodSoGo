import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent implements OnInit {

  isLogged: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    if(this.auth.isLogged == false){
      localStorage.clear();
     this.isLogged = false;
    } else this.isLogged = true;
  }

  logOut(){
    this.auth.isLogged = false;
    localStorage.clear();
    this.isLogged = false;
  }
}
