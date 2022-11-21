import { Supplier } from "./supplier.model";

export interface OrderBill{
    idOrderBill?: number;
    date?: string;
    totalValue?: number;
    supplier?: Supplier;
}