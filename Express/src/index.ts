import express from "express";
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
