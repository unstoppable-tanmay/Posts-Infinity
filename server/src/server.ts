import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { userRouter } from "./route/user";
import { postRouter } from "./route/posts";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
