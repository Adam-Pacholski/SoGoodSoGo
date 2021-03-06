import { HostListener, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { NavPageComponent } from './dashboard/nav-page/nav-page.component';
import { WeclomePageComponent } from './dashboard/weclome-page/weclome-page.component';
import { FaqPageComponent } from './dashboard/faq-page/faq-page.component';

import { ContactPageComponent } from './dashboard/contact-page/contact-page.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { AboutUsPageComponent } from './dashboard/about-us-page/about-us-page.component';

import { AgmCoreModule } from '@agm/core';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { BazaKrajowPageComponent } from './admin/baza-krajow-page/baza-krajow-page.component';
import { BazaFaqPageComponent } from './admin/baza-faq-page/baza-faq-page.component';
import { PostPageComponent } from './admin/post-page/post-page.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

import { ToastrModule } from 'ngx-toastr';
import { MessageService } from './services/message.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'



@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    NavPageComponent,
    WeclomePageComponent,
    FaqPageComponent,
    ContactPageComponent,
    ProfilePageComponent,
    AboutUsPageComponent,
    AdminPageComponent,
    BazaKrajowPageComponent,
    BazaFaqPageComponent,
    PostPageComponent,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AgmCoreModule.forRoot(environment.google),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true, 
      progressAnimation: 'increasing'
    })
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }


function getFirestore() {
  throw new Error('Function not implemented.');
}


