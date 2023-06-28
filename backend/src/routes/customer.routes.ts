import { Router } from "express";
import { CreateCustomerController } from "./../modules/customers/useCases/createCustomer/CreateCustomerController";
import { GetAllCustomersController } from "../modules/customers/useCases/getAllCustomers/GetAllCustomersController";
import { GetCustomerByIdController } from "../modules/customers/useCases/getCustomerById/GetCustomerByIdController";

const createCustomerController = new CreateCustomerController();
const getAllCustomersController = new GetAllCustomersController();
const getCustomerByIdController = new GetCustomerByIdController();

const customerRoutes = Router();

customerRoutes.post("/", createCustomerController.handle);
customerRoutes.get("/", getAllCustomersController.handle);
customerRoutes.get("/:id", getCustomerByIdController.handle);

export { customerRoutes };
