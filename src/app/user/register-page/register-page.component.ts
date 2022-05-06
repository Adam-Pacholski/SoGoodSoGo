import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  email: string = '';
  password: string = '';
  rePassword: string = '';
  user: User = {id:'',name:'',surname:'',email:''};

  isChecked:boolean = false;
  falsePassword: boolean = false;

  constructor(
   // private router: Router,
    
    private auth: AuthService 
     ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    if(this.password == this.rePassword){
      this.auth.signup(this.user, this.password);
    }else {
      
    }
    

  }

  
}
 