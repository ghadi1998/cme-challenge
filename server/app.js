import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

const authRoute = require("./routes/index").default;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Route Middlewares
app.use("/api", authRoute);

export default app;
