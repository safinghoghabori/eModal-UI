import { Routes } from '@angular/router';
import { CommonComponent } from './layout/common/common.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ContainersWatchlistComponent } from './features/containers-watchlist/containers-watchlist.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { UploadEdiComponent } from './features/upload-edi/upload-edi.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnAuthGuard } from './core/guards/un-auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
    canActivate: [UnAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ContainersWatchlistComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'upload-edi', component: UploadEdiComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
