import { Document, Model } from "mongoose";
import { OrderDTO } from "../modules/Order/dto/Order.dto";

export type HttpResponse<T> = {
  data?: T;
  status?: number;
  message?: string;
};


//#region ORDER
export interface OrderDocument extends Document<any, any, any>, OrderDTO {}
export type OrderModelType = Model<OrderDocument>;
//#endregion ORDER