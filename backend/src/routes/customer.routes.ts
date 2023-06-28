import { Router } from "express";
import { CreateCustomerController } from "./../modules/customers/useCases/createCustomer/CreateCustomerController";
import { GetAllCustomersController } from "../modules/customers/useCases/getAllCustomers/GetAllCustomersController";
import { GetCustomerByIdController } from "../modules/customers/useCases/getCustomerById/GetCustomerByIdController";
import { UpdateCustomerController } from "./../modules/customers/useCases/updateCustomer/UpdateCustomerController";
import { DeleteCustomerController } from "./../modules/customers/useCases/deleteCustomer/DeleteCustomerController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCustomerController = new CreateCustomerController();
const getAllCustomersController = new GetAllCustomersController();
const getCustomerByIdController = new GetCustomerByIdController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

const customerRoutes = Router();

customerRoutes.post("/", ensureAuthenticated, createCustomerController.handle);
customerRoutes.get("/", ensureAuthenticated, getAllCustomersController.handle);
customerRoutes.get(
  "/:id",
  ensureAuthenticated,
  getCustomerByIdController.handle
);
customerRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateCustomerController.handle
);
customerRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteCustomerController.handle
);

export { customerRoutes };
