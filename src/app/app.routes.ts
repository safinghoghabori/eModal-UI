import { Routes } from '@angular/router';
import { CommonComponent } from './layout/common/common.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ContainersWatchlistComponent } from './features/containers-watchlist/containers-watchlist.component';

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
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: '', component: ContainersWatchlistComponent }],
  },
];
