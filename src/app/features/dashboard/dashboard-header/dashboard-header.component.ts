import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserData } from '../../../auth/login/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
  userData: UserData;

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.userData = this.localStorageService.getUserData();
  }

  getUserName(): string {
    return this.userData.firstName + ' ' + this.userData.lastName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
