import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private auth: AuthService
    ) { }

  isChecked:boolean = false;

  ngOnInit(): void {
  }

  onSubmit(){

    this.auth.signin(this.email,this.password);
    
  }
}
