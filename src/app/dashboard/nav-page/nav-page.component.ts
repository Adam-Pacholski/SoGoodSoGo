import { Component, HostListener, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent implements OnInit {

  isLogged: boolean = false;
  constructor() { }

  ngOnInit(): void {

    if(localStorage.getItem('user')!==null){
     this.isLogged = true;
    } else this.isLogged = false;
  }

  logOut(){
    localStorage.clear();
    this.isLogged = false;
  }
}
