import { Router } from "express";
import { DeleteUserController } from "./../modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "./../modules/users/useCases/updateUser/UpdateUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUserByEmailController } from "../modules/users/useCases/getUserByEmail/GetUserByEmailController";

const createUserController = new CreateUserController();
const getUserByEmailController = new GetUserByEmailController();
const getAllUsersController = new GetAllUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", getAllUsersController.handle);
userRoutes.get("/:email", getUserByEmailController.handle);
userRoutes.put("/:email", updateUserController.handle);
userRoutes.delete("/:email", deleteUserController.handle);

export { userRoutes };
