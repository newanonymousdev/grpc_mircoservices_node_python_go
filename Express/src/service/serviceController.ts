import { Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "./review.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const reviewProto = grpc.loadPackageDefinition(packageDefinition).review as any;

const client = new reviewProto.ReviewService(
  "localhost:5100",
  grpc.credentials.createInsecure()
);

export const getServiceController = async (req: Request, res: Response) => {
  res.send("Get service");
};

export const createReviewController = async (req: Request, res: Response) => {
  client.CreateReview({}, (error: any, response: any) => {
    if (error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(201).send(response);
    }
  });
};
