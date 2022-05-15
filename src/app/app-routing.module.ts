import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './dashboard/contact-page/contact-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { FaqPageComponent } from './dashboard/faq-page/faq-page.component';
import { WeclomePageComponent } from './dashboard/weclome-page/weclome-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AboutUsPageComponent } from './dashboard/about-us-page/about-us-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { BazaKrajowPageComponent } from './admin/baza-krajow-page/baza-krajow-page.component';
import { BazaFaqPageComponent } from './admin/baza-faq-page/baza-faq-page.component';
import { PostPageComponent } from './admin/post-page/post-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '', component: DashboardPageComponent, children: [
      { path: '', component: WeclomePageComponent },
      { path: 'faq', component: FaqPageComponent },
      { path: 'conact', component: ContactPageComponent },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'about-us',component: AboutUsPageComponent },
      { path: 'admin', component:AdminPageComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}, children: [
        {path: '',component:PostPageComponent},
        {path: 'baza-krajow', component: BazaKrajowPageComponent},
        {path: 'baza-faq',component:BazaFaqPageComponent}
      ]}
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
