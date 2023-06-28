import { Router } from "express";
import { userRoutes } from "./user.routes";
import { customerRoutes } from "./customer.routes";
import { invoiceRoutes } from "./invoice.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/customers", customerRoutes);
routes.use("/invoices", invoiceRoutes);

export { routes };
