import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../../service.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).myservice as any;

const client = new proto.MyService(
  "http://127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

export const clientHello = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.SayHello({ name: "NodeJS" }, (err: any, response: any) => {
      if (err) {
        console.error("Lỗi gRPC:", err);
        reject(err);
      } else {
        console.log("Phản hồi từ Django:", response.message);
        resolve(response.message);
      }
    });
  });
};
