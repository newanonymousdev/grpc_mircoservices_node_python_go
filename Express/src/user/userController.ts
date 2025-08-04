import { Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "./user.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user as any;

const client = new userProto.UserService(
  "localhost:5100",
  grpc.credentials.createInsecure()
);

export const getUserController = async (req: Request, res: Response) => {
  res.send("Get user");
};

export const createUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  client.CreateUser(
    { email: email, password: password },
    (error: any, response: any) => {
      if (error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(201).send(response);
      }
    }
  );
};
