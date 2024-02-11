export interface ConfigPrinter {
    active: boolean;
    ipServerPrint: string;
    isConnect: boolean;
    loadingConnect: boolean;
    printers: Printer[];
    printerPreAccount: Printer
}

export interface Printer {
    ip: string;
    name?: string;
    model?: string;
    isConnect?: boolean;
    loadingConnect?: boolean;
    tag: Tag | null;
}


export interface Tag {
    id: number
    name: string
}