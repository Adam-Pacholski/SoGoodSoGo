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
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    NavPageComponent,
    WeclomePageComponent,
    FaqPageComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
