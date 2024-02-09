import { Printer } from "./PrinterConfig.interface";

export interface Queue {
    configPrinter: Printer
    date: Date
    isPrinted: boolean
    table: Table
    typePrinted: "preaccount" | "command"
}

export interface Table {
    id: number;
    status: string;
    products: Product[];
    total: number;
    personas: number;
    label: string;
    shape: string;
    environment: string;
    waiter: Waiter;
    tag: Tag;

}

export interface Product {
    id: number;
    name: string;
    note: string;
    price: number;
    imageUrl: string;
    itemCode: null;
    quantity: number;
    status: number;
    tag: Tag[];
    categoryId: number | null;
    internalId: string;
    unitTypeId: string;
    currencyTypeSymbol: string;
    sale_affectation_igv_type_id: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Waiter {
    id: number;
    name: string;
}

