import mongoose from "mongoose";
import ProductSchema from "./Product.schema";

import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import { ProductDocument, ProductModelType } from "./interfaces";
import { Router } from "express";

export default class ProductModule {
  constructor() {}

  static Init(dbClient: typeof mongoose, router: Router) {
    const ProductModel = dbClient.model<ProductDocument, ProductModelType>(
      "Product",
      ProductSchema
    );
    const orderService = new ProductService(ProductModel);
    const orderController = new ProductController(orderService);
    const subRoutes = orderController.Init();
    router.use("/orders", subRoutes);
  }
}
