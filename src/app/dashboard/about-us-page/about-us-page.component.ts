import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent implements OnInit {


  
  lat = 10;
  long = 7;

  constructor() { }

  ngOnInit(): void {
  }

  

}
