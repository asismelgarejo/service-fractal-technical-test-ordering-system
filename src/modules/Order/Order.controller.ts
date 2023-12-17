import { HttpResponse } from "../../constants/interfaces";
import OrderService from "./Order.service";
import { OrderDTO } from "./interfaces";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export default class OrderController {
  constructor(private orderService: OrderService) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.getOrders.bind(this));
    router.post("/", this.createOrder.bind(this));
    return router;
  }

  async getOrders(req: Request, res: Response) {
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");

    try {
      const orders = await this.orderService.getOrders();
      response.data = orders;

      response.message = "success";
      response.status = httpStatus.OK;

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderController GET: ", error);

      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;

      res.send(response);
    }
  }
  async createOrder(req: Request, res: Response) {
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as Omit<OrderDTO, "_id">;

    if (!payload) {
      response.message = "Fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;

      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }

    try {
      await this.orderService.createOrder(payload);
      response.status = httpStatus.CREATED;
      response.message = "Order was successfully created.";
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      console.log("OrderController CREATE: ", error);

      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
}
