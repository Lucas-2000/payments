import { Router } from "express";
import { userRoutes } from "./user.routes";
import { customerRoutes } from "./customer.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/customers", customerRoutes);

export { routes };
