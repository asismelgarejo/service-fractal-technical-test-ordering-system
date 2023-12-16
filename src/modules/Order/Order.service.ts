import { OrderDTO } from "./dto/Order.dto";
import { OrderModelType } from "../../constants/interfaces";

export default class OrderService {
  constructor(private model: OrderModelType) {}

  async getOrders(): Promise<OrderDTO[]> {
    try {
      return this.model.find();
    } catch (error) {
      console.log("OrderService: ", error);
      throw error;
    }
  }

  async createOrder(payload: Omit<OrderDTO, "_id">): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("OrderService: createOrder", error);
      throw error;
    }
  }
}
