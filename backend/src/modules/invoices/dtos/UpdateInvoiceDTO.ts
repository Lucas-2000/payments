export interface UpdateInvoiceDTO {
  id: string;
  description: string;
  value: number;
  payment_method: string;
  due_date: string;
  is_paid: boolean;
}
