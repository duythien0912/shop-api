import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import auth from "./routers/auth";

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/shopreact");

app.use("/api/auth", auth);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("running in localhost:8080"));
