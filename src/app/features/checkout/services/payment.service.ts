import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Observable } from 'rxjs';
import { PaymentResp, PaymentRequest } from '../models/checkout.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:7090/api/payments';
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService
  ) {}

  initiatePayment(paymentRequest: PaymentRequest): Observable<PaymentResp> {
    return this.http.post<PaymentResp>(
      `${this.apiUrl}/initiate`,
      paymentRequest
    );
  }
}
