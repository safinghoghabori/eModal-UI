import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentResp, PaymentRequest } from '../models/checkout.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  initiatePayment(paymentRequest: PaymentRequest): Observable<PaymentResp> {
    return this.http.post<PaymentResp>(
      `${this.apiUrl}/payments/initiate`,
      paymentRequest,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.localStorageService.getToken()}`,
        }),
      }
    );
  }
}
