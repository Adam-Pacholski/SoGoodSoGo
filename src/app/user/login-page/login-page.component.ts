import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private auth: AuthService
    ) { }

  isChecked:boolean = false;

  ngOnInit(): void {
  }

  onSubmit(){

    
    this.auth.test();

    //localStorage.setItem('user','adam');
   
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/profile'],{relativeTo:this.route})
    
  }
}
