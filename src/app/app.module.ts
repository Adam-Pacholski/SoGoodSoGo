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


@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    NavPageComponent,
    WeclomePageComponent,
    FaqPageComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


function getFirestore() {
  throw new Error('Function not implemented.');
}

