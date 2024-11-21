import { Routes } from '@angular/router';
import { CommonComponent } from './layout/common/common.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
