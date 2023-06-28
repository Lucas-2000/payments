import { Router } from "express";
import { CreateInvoiceController } from "../modules/invoices/useCases/createInvoices/CreateInvoiceController";
import { DeleteInvoiceController } from "../modules/invoices/useCases/deleteInvoice/DeleteInvoiceController";
import { GetAllInvoicesController } from "../modules/invoices/useCases/getAllInvoices/GetAllInvoicesController";
import { GetInvoicesByIdController } from "../modules/invoices/useCases/getInvoicesById/GetInvoicesByIdController";
import { UpdateInvoiceController } from "../modules/invoices/useCases/updateInvoice/UpdateInvoiceController";

const createInvoiceController = new CreateInvoiceController();
const getAllInvoicesController = new GetAllInvoicesController();
const getInvoicesByIdController = new GetInvoicesByIdController();
const updateInvoiceController = new UpdateInvoiceController();
const deleteInvoiceController = new DeleteInvoiceController();

const invoiceRoutes = Router();

invoiceRoutes.post("/", createInvoiceController.handle);
invoiceRoutes.get("/", getAllInvoicesController.handle);
invoiceRoutes.get("/:id", getInvoicesByIdController.handle);
invoiceRoutes.put("/:id", updateInvoiceController.handle);
invoiceRoutes.delete("/:id", deleteInvoiceController.handle);

export { invoiceRoutes };
