import { Section } from "./section.model";

export interface Product{
    idProduct?: number;
    name?: string;
    quantityAvailable?: number;
    saleValue?: number;
    section?: Section;
}