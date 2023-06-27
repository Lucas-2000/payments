import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUserByEmailController } from "../modules/users/useCases/getUserByEmail/GetUserByEmailController";

const createUserController = new CreateUserController();
const getUserByEmailController = new GetUserByEmailController();
const getAllUsersController = new GetAllUsersController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", getAllUsersController.handle);
userRoutes.get("/:email", getUserByEmailController.handle);

export { userRoutes };
