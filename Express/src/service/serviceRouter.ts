import { Router } from "express";
import { getServiceController } from "./serviceController";

const serviceRouter = Router();

serviceRouter.get("", getServiceController);

export default serviceRouter;
