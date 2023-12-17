import express, { Express } from "express";
import cors from "cors";
import pkg from "body-parser";
const { urlencoded } = pkg;
import * as dotenv from "dotenv";
dotenv.config();

import { InitializeDB } from "./database";

import OrderModule from "./modules/Order";
import { PORT } from "./constants/app";

export default class Application {
  app: Express;
  constructor() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    this.app = app;
  }

  async Init() {
    const dbClient = await InitializeDB();
    OrderModule.Init(dbClient, this.app);

    this.app.use("/hello", (_, res, _2) => {
      res.status(200).json({ message: "Project Created by Asis Melgarejo" });
    });

    this.app.use((_, res, _2) => {
      res.status(404).json({ error: "NOT FOUND" });
    });
  }
}
