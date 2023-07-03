import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateInvoiceController } from "../modules/invoices/useCases/CreateInvoices/CreateInvoiceController";
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

invoiceRoutes.post("/", ensureAuthenticated, createInvoiceController.handle);
invoiceRoutes.get("/", ensureAuthenticated, getAllInvoicesController.handle);
invoiceRoutes.get(
  "/:id",
  ensureAuthenticated,
  getInvoicesByIdController.handle
);
invoiceRoutes.put("/:id", ensureAuthenticated, updateInvoiceController.handle);
invoiceRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteInvoiceController.handle
);

export { invoiceRoutes };
