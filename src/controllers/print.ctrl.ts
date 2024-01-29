import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import type { ConfigPrinter, Printer, Tag } from '../interfaces/PrinterConfig.interface'
import { printer } from "node-thermal-printer";
import { Table } from "../interfaces/Table.interface,";
const products = [
    {
        id: 4,
        name: "1/2 pollo + papas + ensalada + 2 gaseosas",
        note: "nota 1",
        price: 40,
        imageUrl:
            "https://restaurant.nt-suite.com/storage/uploads/items/12-pollo-papas-ensal-20230501202920.jpg",
        itemCode: null,
        quantity: 1,
        statusBar: 0,
        categoryId: null,
        internalId: "2",
        unitTypeId: "NIU",
        statusKitchen: 0,
        currencyTypeSymbol: "S/",
        sale_affectation_igv_type_id: "10"
    },
    {
        id: 3,
        name: "1/2 pollo + papas + ensalada",
        note: "",
        price: 34,
        imageUrl:
            "https://restaurant.nt-suite.com/storage/uploads/items/12-pollo-papas-ensal-20230501202835.jpg",
        itemCode: null,
        quantity: 4,
        statusBar: 0,
        categoryId: 1,
        internalId: "1",
        unitTypeId: "NIU",
        statusKitchen: 0,
        currencyTypeSymbol: "S/",
        sale_affectation_igv_type_id: "10"
    },
    {
        id: 9,
        name: "Agua mineral",
        note: "",
        price: 2,
        imageUrl:
            "https://restaurant.nt-suite.com/logo/imagen-no-disponible.jpg",
        itemCode: null,
        quantity: 1,
        statusBar: 0,
        categoryId: null,
        internalId: "00009",
        unitTypeId: "NIU",
        statusKitchen: 0,
        currencyTypeSymbol: "S/",
        sale_affectation_igv_type_id: "10"
    },
    {
        id: 10,
        name: "ceviche de corvina",
        note: "",
        price: 22,
        imageUrl:
            "https://restaurant.nt-suite.com/logo/imagen-no-disponible.jpg",
        itemCode: null,
        quantity: 1,
        statusBar: 0,
        categoryId: null,
        internalId: "00010",
        unitTypeId: "NIU",
        statusKitchen: 0,
        currencyTypeSymbol: "S/",
        sale_affectation_igv_type_id: "10"
    }
];

const printCommand = async ({ body }: Request, res: Response) => {
    try {
        const configPrinter: Printer = body.configPrinter
        const table: Table = body.table
        const tag: Tag = body.tag

        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });

        let isConnected = false
        for (let i = 0; i < 4; i++) {
            isConnected = await printer.isPrinterConnected();
            if (isConnected) break
            await waitExcecute(30);
        }
        if (!isConnected) return res.status(400).send({ status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." })

        printer.alignCenter();
        printer.setTextDoubleHeight();
        printer.setTextDoubleWidth();
        printer.println("COMANDA");
        printer.println("");
        printer.tableCustom(
            [
                { text: "AMBIENTE:", align: "LEFT", width: 0.25 },
                { text: table.environment, align: "LEFT", width: 0.25 },
            ]);
        printer.tableCustom(
            [
                { text: "MOZO:", align: "LEFT", width: 0.25 },
                { text: table.waiter.name ? table.waiter.name : '', align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "MESA:", align: "LEFT", width: 0.25 },
                { text: table.label, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "PREPARA:", align: "LEFT", width: 0.25 },
                { text: tag.name, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.drawLine();
        printer.alignLeft();
        printer.setTypeFontB();
        table.products.forEach((product, index) => {
            printer.println((index + 1) + ") [" + product.quantity + "] " + product.name);
            if (product.note) {
                printer.println("N: " + product.note);
            }
            printer.newLine();
        });
        printer.cut();
        try {
            let execute = printer.execute()
            res.status(200).send({ status: true, msg: "impresión exitosa" })
        } catch (error) {
            res.status(500).send({ status: false, msg: "Error al imprimir: " + error })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: "Error al imprimir: " + error })

    }
};

const printPreAccount = async ({ body }: Request, res: Response) => {

    try {

        const configPrinter: Printer = body.configPrinter
        const table: Table = body.table
        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });
        let isConnected = false
        for (let i = 0; i < 4; i++) {
            isConnected = await printer.isPrinterConnected();
            if (isConnected) break
            await waitExcecute(50);
        }
        printer.setTextDoubleHeight();                              // Set text to double height
        printer.setTextDoubleWidth();
        printer.alignCenter();
        printer.println("PRECUENTA");
        printer.println("");
        printer.setTextNormal();
        printer.alignLeft();

        printer.tableCustom(
            [
                { text: "AMBIENTE:", align: "LEFT", width: 0.25 },
                { text: table.environment, align: "LEFT", width: 0.25 },
            ]);
        printer.tableCustom(
            [
                { text: "MOZO:", align: "LEFT", width: 0.25 },
                { text: table.waiter.name ? table.waiter.name : '', align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "MESA:", align: "LEFT", width: 0.25 },
                { text: table.label, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "FECHA:", align: "LEFT", width: 0.25 },
                { text: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`, align: "LEFT", width: 0.75, bold: true },
            ]);
        if (!isConnected) return res.status(400).send({ status: false, msg: "Impresora con ip: 192.168.18.166 no encontrada." })
        printer.println("");
        printer.drawLine();
        printer.tableCustom([
            { text: "CANT", align: "LEFT", cols: 5 },
            { text: "DESCRIPCION", align: "CENTER", cols: 27 },
            { text: "P. UNI.", align: "CENTER", cols: 8 },
            { text: "TOTAL", align: "CENTER", cols: 8 },
        ]);

        printer.drawLine();


        table.products.forEach((product, index) => {
            printer.tableCustom([
                { text: product.quantity, align: "LEFT", cols: 5, width: 0.11 },
                { text: product.name, align: "LEFT", cols: 27, width: 0.56 },
                { text: product.price, align: "LEFT", cols: 8, width: 0.14 },
                { text: (product.price * product.quantity), align: "LEFT", cols: 8, width: 0.14 },
            ]);
        });
        printer.drawLine();
        printer.tableCustom([
            { text: "", align: "LEFT", cols: 7 },
            { text: "", align: "LEFT", cols: 20 },
            { text: "TOTAL:", align: "LEFT", cols: 8 },
            { text: "S/." + table.total, align: "LEFT", cols: 15 },
        ]);
        printer.println("DNI/RUC:");
        printer.println("");
        printer.println("");
        printer.println("NOMBRE/RAZON SOCIAL:");
        printer.println("");

        printer.cut();

        try {
            let execute = printer.execute()
            res.status(200).send({ status: true, msg: "impresión exitosa" })
        } catch (error) {
            res.status(500).send({ status: false, msg: "Error al imprimir: " + error })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: "Error al imprimir: " + error })

    }
};

const isConnectedPrint = async ({ body }: Request, res: Response) => {
    try {
        const configPrinter: Printer = await body.printer
        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });
        let isConnected = false
        for (let i = 0; i < 4; i++) {
            isConnected = await printer.isPrinterConnected();
            if (isConnected) break
            await waitExcecute(30);
        }
        if (!isConnected) { return res.status(400).send({ status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." }) }

        return res.status(200).send({ status: true, msg: "Impresora con ip: " + configPrinter.ip + " conectada." })

    } catch (error) {
        return res.status(500).send({ status: false, msg: "Hubo un error al conectar la impresora: " + error })
    }
};

const isConnectedServer = async ({ body }: Request, res: Response) => {
    try {
        return res.status(200).send({ status: true, msg: "Servidor conectado" })

    } catch (error) {
        return res.status(500).send({ status: false, msg: "Servidor no conectado" + error })
    }
};

function waitExcecute(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





// 


const printAccountTest = async ({ body }: Request, res: Response) => {

    try {

        const configPrinter: Printer = body.configPrinter
        const table: Table = body.table
        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });
        let isConnected = false
        for (let i = 0; i < 4; i++) {
            isConnected = await printer.isPrinterConnected();
            if (isConnected) break
            await waitExcecute(50);
        }
        printer.setTextDoubleHeight();                              // Set text to double height
        printer.setTextDoubleWidth();
        printer.alignCenter();
        printer.println("PRECUENTA");
        printer.println("");
        printer.setTextNormal();
        printer.alignLeft();

        printer.tableCustom(
            [
                { text: "AMBIENTE:", align: "LEFT", width: 0.25 },
                { text: table.environment, align: "LEFT", width: 0.25 },
            ]);
        printer.tableCustom(
            [
                { text: "MOZO:", align: "LEFT", width: 0.25 },
                { text: table.waiter.name ? table.waiter.name : '', align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "MESA:", align: "LEFT", width: 0.25 },
                { text: table.label, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "FECHA:", align: "LEFT", width: 0.25 },
                { text: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`, align: "LEFT", width: 0.75, bold: true },
            ]);
        if (!isConnected) return res.status(400).send({ status: false, msg: "Impresora con ip: 192.168.18.166 no encontrada." })
        printer.println("");
        printer.drawLine();
        printer.tableCustom([
            { text: "CANT", align: "LEFT", cols: 5 },
            { text: "DESCRIPCION", align: "CENTER", cols: 27 },
            { text: "P. UNI.", align: "CENTER", cols: 8 },
            { text: "TOTAL", align: "CENTER", cols: 8 },
        ]);

        printer.drawLine();


        table.products.forEach((product, index) => {
            printer.tableCustom([
                { text: product.quantity, align: "LEFT", cols: 5, width: 0.11 },
                { text: product.name, align: "LEFT", cols: 27, width: 0.56 },
                { text: product.price, align: "LEFT", cols: 8, width: 0.14 },
                { text: (product.price * product.quantity * 100), align: "LEFT", cols: 8, width: 0.14 },
            ]);
        });
        printer.tableCustom([
            { text: "", align: "LEFT", cols: 7 },
            { text: "", align: "LEFT", cols: 20 },
            { text: "TOTAL:", align: "LEFT", cols: 8 },
            { text: "S/.1231" + table.total, align: "LEFT", cols: 15 },
        ]);
        printer.println("DNI/RUC:");
        printer.println("");
        printer.println("");
        printer.println("NOMBRE/RAZON SOCIAL:");
        printer.println("");

        printer.cut();

        try {
            let execute = printer.execute()
            res.status(200).send({ status: true, msg: "impresión exitosa" })
        } catch (error) {
            res.status(500).send({ status: false, msg: "Error al imprimir: " + error })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: "Error al imprimir: " + error })

    }
};

export { printCommand, printPreAccount, isConnectedServer, isConnectedPrint, printAccountTest };
