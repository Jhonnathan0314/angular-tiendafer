import { OrderBill } from "./order.model";
import { Product } from "./product.model";

export interface DetailOrderBill{
    idDetailOrderBill?: number;
    orderedQuantity?: number;
    receivedQuantity?: number;
    unitValue?: number;
    totalValue?: number;
    product?: Product;
    orderBill?: OrderBill;
}