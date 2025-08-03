import express from "express";
import { clientHello } from "./client";
import userRouter from "./user/userRouters";
import serviceRouter from "./service/serviceRouter";
require("dotenv").config();

const app = express();
const PORT = process.env.NODEJS_PORT || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello world!");
});

app.use("/user", userRouter);
app.use("/service", serviceRouter);

app.get("/grpc", async (req, res) => {
  try {
    const message = await clientHello();
    res.send(message);
  } catch (err) {
    res.status(500).send("Lỗi khi gọi gRPC");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
