import { Client } from "./client.model";

export interface ClientBill{
    idClientBill?: number;
    totalValue?: number;
    pendingValue?: number;
    date?: string;
    pending?: string;
    client?: Client;
}