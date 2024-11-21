import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { LocalStorageService } from './local-storage.service';
import { catchError, Observable, tap } from 'rxjs';
import { LoginReq, LoginResp } from '../../auth/login/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: LoginReq): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: LoginResp) => {
        this.localStorageService.setToken(response.token);
        this.localStorageService.setUserData(response.data);
        this.router.navigate(['/dashboard']);
      }),
      catchError(this.errorHandlerService.handleError)
    );
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getToken();
    return !!token;
  }

  logout() {
    this.localStorageService.removeLocalStorageData();
    this.router.navigate(['/login']);
  }
}
