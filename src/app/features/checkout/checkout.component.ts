import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerData } from '../add-container/models/add-container.model';

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

  constructor(private location: Location) {}

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
      alert(
        'Payment successful for Container ' +
          this.container?.containerInfo.containerNumber
      );
    } else {
      alert('Please fix the errors in the form.');
    }
  }
}
