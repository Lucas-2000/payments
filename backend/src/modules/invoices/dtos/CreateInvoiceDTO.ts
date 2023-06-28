export interface CreateInvoiceDTO {
  description: string;
  value: number;
  payment_method: string;
  due_date: string;
  is_paid: boolean;
  userId: string;
  customerId: string;
}
