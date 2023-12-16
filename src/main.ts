const serverless = require("serverless-http");
import express from "express";
import cors from "cors";
import pkg from "body-parser";
const { urlencoded } = pkg;
import * as dotenv from "dotenv";
dotenv.config();

import { InitializeDB } from "./database";

import OrderModule from "./modules/Order";
import { PORT } from "./constants/app";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

async function main() {
  const dbClient = await InitializeDB();
  OrderModule.Init(dbClient, app);
  app.listen(PORT, () => {
    console.log("Server running on " + `localhost:${PORT}`);
  });
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.log(err);
  }
})();
