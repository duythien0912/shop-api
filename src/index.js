import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bluebird from "bluebird";

import auth from "./routers/auth";
import users from "./routers/users";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URL);

app.use("/api/auth", auth);
app.use("/api/users", users);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8081, () => console.log("running in localhost:8081"));
