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
    tag: Waiter[];
    categoryId: number | null;
    internalId: string;
    unitTypeId: string;
    currencyTypeSymbol: string;
    sale_affectation_igv_type_id: string;
}

export interface Waiter {
    id: number;
    name: string;
}
