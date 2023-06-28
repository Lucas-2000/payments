import { CreateCustomerController } from "./../modules/customers/useCases/createCustomer/CreateCustomerController";
import { Router } from "express";

const createCustomerController = new CreateCustomerController();

const customerRoutes = Router();

customerRoutes.post("/", createCustomerController.handle);

export { customerRoutes };
