import { Router } from "express";
import {
  createReviewController,
  getServiceController,
} from "./serviceController";

const serviceRouter = Router();

serviceRouter.get("", getServiceController);
serviceRouter.post("/create-review", createReviewController);

export default serviceRouter;
