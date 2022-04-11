import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/index";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

// router
app.use("/", routes);

app.use(function (req: Request, res: Response) {
  res.status(404).json({
    message: "No such route exists",
  });
});
export default app;