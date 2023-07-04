import { Request, Response, Router } from "express";
import { userRoutes } from "./user.routes";
import { customerRoutes } from "./customer.routes";
import { invoiceRoutes } from "./invoice.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/customers", customerRoutes);
routes.use("/invoices", invoiceRoutes);

// API Documentation
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.get("/swagger", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/swagger.json");
});
routes.get("/docs", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/index.html");
});

export { routes };
