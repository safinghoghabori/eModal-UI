import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerData } from '../add-container/models/add-container.model';
import { PaymentService } from './services/payment.service';
import { PaymentRequest, PaymentResp } from './models/checkout.model';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  container: ContainerData | null = null;
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  };
  errors: any = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  };
  isLoading: boolean = false;

  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve container data passed via state
    const state = this.location.getState() as any;
    this.container = state.container;
  }

  validateCardNumber(): void {
    const { cardNumber } = this.paymentDetails;

    if (!cardNumber) {
      this.errors.cardNumber = 'Card number is required.';
    } else if (!/^[0-9]{13,19}$/.test(cardNumber)) {
      this.errors.cardNumber = 'Card number must be 13-19 digits.';
    } else {
      this.errors.cardNumber = '';
    }
  }

  validateExpiryDate(): void {
    const { expiryDate } = this.paymentDetails;

    if (!expiryDate) {
      this.errors.expiryDate = 'Expiry date is required.';
    } else {
      const today = new Date();
      const [year, month] = expiryDate.split('-').map(Number);
      const expiry = new Date(year, month - 1);

      if (expiry < today) {
        this.errors.expiryDate = 'Expiry date must be in the future.';
      } else {
        this.errors.expiryDate = '';
      }
    }
  }

  validateCVV(): void {
    const { cvv } = this.paymentDetails;

    if (!cvv) {
      this.errors.cvv = 'CVV is required.';
    } else if (!/^[0-9]{3,4}$/.test(cvv)) {
      this.errors.cvv = 'CVV must be 3 or 4 digits.';
    } else {
      this.errors.cvv = '';
    }
  }

  validateCardholderName(): void {
    const { cardholderName } = this.paymentDetails;

    if (!cardholderName.trim()) {
      this.errors.cardholderName = 'Cardholder name is required.';
    } else {
      this.errors.cardholderName = '';
    }
  }

  hasErrors(): boolean {
    return Object.values(this.errors).some((error) => error !== '');
  }

  makePayment(): void {
    if (!this.hasErrors()) {
      const userData = this.localStorageService.getUserData();
      const paymentRequest: PaymentRequest = {
        userId: userData.id,
        amount: this.container?.containerFeesInfo.totalFees || 0,
        ediFileId: this.container?.id || '',
        containerNumber: this.container?.containerInfo.containerNumber || '',
      };

      this.isLoading = true;
      this.paymentService.initiatePayment(paymentRequest).subscribe({
        next: (response: PaymentResp) => {
          this.isLoading = false;
          if (response.isSuccessful) {
            // Update container json in local storage
            const updatedContainers = this.localStorageService
              .getContainersData()
              .map((item) => {
                if (
                  item.containerInfo.containerNumber ===
                  this.container?.containerInfo.containerNumber
                ) {
                  item.containerFeesInfo.isFeesPaid = true;
                }
                return item;
              });
            this.localStorageService.setContainersData(updatedContainers);

            // Navigate to My containers page
            this.router.navigate(['dashboard']);
            alert('Payment done successfully!');
          } else {
            alert('Payment failed. Please try again.');
          }
        },
        error: (error) => {
          this.isLoading = false;
          alert('An error occurred while processing payment.');
        },
      });
    } else {
      alert('Please fix the errors in the form.');
    }
  }
}
