import { Router } from "express";
import { CreateCustomerController } from "./../modules/customers/useCases/createCustomer/CreateCustomerController";
import { GetAllCustomersController } from "../modules/customers/useCases/getAllCustomers/GetAllCustomersController";
import { GetCustomerByIdController } from "../modules/customers/useCases/getCustomerById/GetCustomerByIdController";
import { UpdateCustomerController } from "./../modules/customers/useCases/updateCustomer/UpdateCustomerController";
import { DeleteCustomerController } from "./../modules/customers/useCases/deleteCustomer/DeleteCustomerController";

const createCustomerController = new CreateCustomerController();
const getAllCustomersController = new GetAllCustomersController();
const getCustomerByIdController = new GetCustomerByIdController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

const customerRoutes = Router();

customerRoutes.post("/", createCustomerController.handle);
customerRoutes.get("/", getAllCustomersController.handle);
customerRoutes.get("/:id", getCustomerByIdController.handle);
customerRoutes.put("/:id", updateCustomerController.handle);
customerRoutes.delete("/:id", deleteCustomerController.handle);

export { customerRoutes };
