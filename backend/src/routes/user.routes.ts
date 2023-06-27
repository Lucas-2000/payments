import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserByEmailController } from "../modules/users/useCases/getUserByEmail/GetUserByEmailController";

const createUserController = new CreateUserController();
const getUserByEmailController = new GetUserByEmailController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/:email", getUserByEmailController.handle);

export { userRoutes };
