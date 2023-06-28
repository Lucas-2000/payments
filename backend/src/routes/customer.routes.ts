import { Router } from "express";
import { CreateCustomerController } from "./../modules/customers/useCases/createCustomer/CreateCustomerController";
import { GetAllCustomersController } from "../modules/customers/getAllCustomers/GetAllCustomersController";

const createCustomerController = new CreateCustomerController();
const getAllCustomersController = new GetAllCustomersController();

const customerRoutes = Router();

customerRoutes.post("/", createCustomerController.handle);
customerRoutes.get("/", getAllCustomersController.handle);

export { customerRoutes };
