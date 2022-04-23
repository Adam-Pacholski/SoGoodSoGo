import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private router: Router) { }
  isChecked:boolean = false;
  ngOnInit(): void {
  }

  onSubmit(){
    this.router.navigate(['']);
    localStorage.setItem('user','adam');
  }
}
 