import { HttpResponse } from "../../constants/interfaces";
import ProductService from "./Product.service";
import { ProductDTO } from "./interfaces";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export default class ProductController {
  constructor(private orderService: ProductService) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.getProducts.bind(this));
    router.post("/", this.createProduct.bind(this));
    return router;
  }

  async getProducts(req: Request, res: Response) {
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");

    try {
      const orders = await this.orderService.getProducts();
      response.data = orders;

      response.message = "success";
      response.status = httpStatus.OK;

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("ProductController GET: ", error);

      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;

      res.send(response);
    }
  }
  async createProduct(req: Request, res: Response) {
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as Omit<ProductDTO, "_id">;

    if (!payload) {
      response.message = "Fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;

      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }

    try {
      await this.orderService.createProduct(payload);
      response.status = httpStatus.CREATED;
      response.message = "Product was successfully created.";
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      console.log("ProductController CREATE: ", error);

      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
}
