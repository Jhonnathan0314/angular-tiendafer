import { Client } from "./client.model";

export interface Payment{
    idPayment?: number;
    date?: string;
    cash?: number;
    changeMoney?: number;
    client?: Client;
}