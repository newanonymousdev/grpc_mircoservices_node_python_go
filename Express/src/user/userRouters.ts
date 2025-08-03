import { Router } from "express";
import { createUserController, getUserController } from "./userController";

const userRouter = Router();

userRouter.get("", getUserController);
userRouter.post("/register", createUserController);

export default userRouter;
