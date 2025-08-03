import { Request, Response } from "express";

export const getServiceController = async (req: Request, res: Response) => {
  res.send("Get service");
};
