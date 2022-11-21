import { Client } from "./client.model";

export interface ClientBill{
    idClientBill?: number;
    totalValue?: number;
    pendingValue?: number;
    date?: string;
    isPending?: boolean;
    client?: Client;
}