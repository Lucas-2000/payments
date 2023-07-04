import { Router } from "express";
import { userRoutes } from "./user.routes";
import { customerRoutes } from "./customer.routes";
import { invoiceRoutes } from "./invoice.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/customers", customerRoutes);
routes.use("/invoices", invoiceRoutes);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { routes };
