import { Router } from "express";
import { CreateInvoiceController } from "../modules/invoices/useCases/CreateInvoices/CreateInvoiceController";

const createInvoiceController = new CreateInvoiceController();

const invoiceRoutes = Router();

invoiceRoutes.post("/", createInvoiceController.handle);

export { invoiceRoutes };
