import { RefreshTokenUserController } from "./../modules/users/useCases/refreshTokenUser/RefreshTokenUserController";
import { Router } from "express";
import { DeleteUserController } from "./../modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "./../modules/users/useCases/updateUser/UpdateUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUserByEmailController } from "../modules/users/useCases/getUserByEmail/GetUserByEmailController";
import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const getUserByEmailController = new GetUserByEmailController();
const getAllUsersController = new GetAllUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", authenticateUserController.handle);
userRoutes.post("/refresh-token", refreshTokenUserController.handle);
userRoutes.get("/", ensureAuthenticated, getAllUsersController.handle);
userRoutes.get("/:email", ensureAuthenticated, getUserByEmailController.handle);
userRoutes.put("/:email", ensureAuthenticated, updateUserController.handle);
userRoutes.delete("/:email", ensureAuthenticated, deleteUserController.handle);

export { userRoutes };
