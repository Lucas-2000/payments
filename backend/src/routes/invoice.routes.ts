import { Router } from "express";
import { CreateInvoiceController } from "../modules/invoices/useCases/createInvoices/CreateInvoiceController";
import { GetAllInvoicesController } from "../modules/invoices/useCases/getAllInvoices/GetAllInvoicesController";
import { GetInvoicesByIdController } from "../modules/invoices/useCases/getInvoicesById/GetInvoicesByIdController";

const createInvoiceController = new CreateInvoiceController();
const getAllInvoicesController = new GetAllInvoicesController();
const getInvoicesByIdController = new GetInvoicesByIdController();

const invoiceRoutes = Router();

invoiceRoutes.post("/", createInvoiceController.handle);
invoiceRoutes.get("/", getAllInvoicesController.handle);
invoiceRoutes.get("/:id", getInvoicesByIdController.handle);

export { invoiceRoutes };
