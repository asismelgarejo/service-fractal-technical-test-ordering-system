import { OrderDTO, OrderModelType } from "./interfaces";
export default class OrderService {
  constructor(private model: OrderModelType) {}

  async getOrders(): Promise<OrderDTO[]> {
    try {
      return await this.model
        .find()
        .populate({
          path: "Products.Product",
          model: "Product",
        })
        .exec();
    } catch (error) {
      console.log("OrderService: ", error);
      throw error;
    }
  }

  async createOrder(payload: Omit<OrderDTO, "ID">): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("OrderService: createOrder", error);
      throw error;
    }
  }
}
