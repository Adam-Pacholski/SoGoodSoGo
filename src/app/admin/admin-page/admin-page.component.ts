import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {



  constructor(private auth: AuthService, private router: Router) {
    if(auth.user.stat === false){
     
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    console.log(this.auth.user.stat);
    
  }



}
