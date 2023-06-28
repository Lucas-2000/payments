import { Router } from "express";
import { CreateInvoiceController } from "../modules/invoices/useCases/createInvoices/CreateInvoiceController";
import { GetAllInvoicesController } from "../modules/invoices/useCases/getAllInvoices/GetAllInvoicesController";

const createInvoiceController = new CreateInvoiceController();
const getAllInvoicesController = new GetAllInvoicesController();

const invoiceRoutes = Router();

invoiceRoutes.post("/", createInvoiceController.handle);
invoiceRoutes.get("/", getAllInvoicesController.handle);

export { invoiceRoutes };
