import { ClientBill } from "./client-bill.model";
import { Product } from "./product.model";

export interface DetailClientBill{
    idDetailClientBill?: number;
    quantity?: number;
    unitValue?: number;
    totalValue?: number;
    product?: Product;
    clientBill?: ClientBill;
}