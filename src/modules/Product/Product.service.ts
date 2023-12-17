import { ProductDTO, ProductModelType } from "./interfaces";

export default class ProductService {
  constructor(private model: ProductModelType) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      return this.model.find();
    } catch (error) {
      console.log("ProductService: ", error);
      throw error;
    }
  }

  async createProduct(payload: Omit<ProductDTO, "_id">): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("ProductService: createProduct", error);
      throw error;
    }
  }
}
