import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./dbConnect.js";
import ContactRouter from "./routes/contactRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

dbConnect();

app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);

app.use("/api/v1", ContactRouter);

app.get("/", (_, res) => res.send("Backend Api Is Running"));
