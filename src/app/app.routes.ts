import { Routes } from '@angular/router';
import { CommonComponent } from './layout/common/common.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [{ path: '', component: LandingPageComponent }],
  },
];
