export interface PaymentRequest {
  userId: string;
  amount: number;
  ediFileId: string;
  containerNumber: string;
}

export interface PaymentResp extends PaymentRequest {
  isSuccessful: boolean;
  transactionId: string;
  paymentDate: Date;
}
