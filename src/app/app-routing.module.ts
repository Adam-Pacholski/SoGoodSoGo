import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './dashboard/contact-page/contact-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { FaqPageComponent } from './dashboard/faq-page/faq-page.component';
import { WeclomePageComponent } from './dashboard/weclome-page/weclome-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';

const routes: Routes = [
  {
    path: '', component: DashboardPageComponent, children: [
      { path: '', component: WeclomePageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'faq', component: FaqPageComponent},
      { path: 'conact', component: ContactPageComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
