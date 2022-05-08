import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User = {id:'',name:'',surname:'',email:''};

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    this.user  = this.auth.user;
  //  console.log(this.user);

  }

  changePassword(){
    this.auth.changePassword();
  }

  

}
