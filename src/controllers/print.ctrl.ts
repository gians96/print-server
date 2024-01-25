import e, { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import type { PrinterConfig } from '../interfaces/PrinterConfig.interface'
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

const printCtrl = async ({ body }: Request, res: Response) => {
    try {
        const configPrinter: PrinterConfig = body.configPrinter
        console.log(body);


        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });

        let isConnected = await printer.isPrinterConnected();
        for (let i = 0; i < 4; i++) {
            let isConnected = await printer.isPrinterConnected();
            // console.log(`Ejecución ${i + 1}: La impresora está ${isConnected ? 'conectada' : 'desconectada'}`);
            if (isConnected) break
            await waitExcecute(350);
        }
        printer.alignCenter();
        printer.setTextDoubleHeight();
        printer.setTextDoubleWidth();
        printer.println("COMANDA");
        printer.println("");
        printer.tableCustom(
            [
                { text: "AMBIENTE:", align: "LEFT", width: 0.25 },
                { text: "2", align: "LEFT", width: 0.25 },
            ]);
        printer.tableCustom(
            [
                { text: "MOZO:", align: "LEFT", width: 0.25 },
                { text: "GIANS96", align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "MESA:", align: "LEFT", width: 0.25 },
                { text: "5", align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "PREPARA:", align: "LEFT", width: 0.25 },
                { text: "COCINA", align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.drawLine();
        printer.alignLeft();
        printer.setTypeFontB();
        products.forEach((element, index) => {
            printer.println((index + 1) + ") [" + element.quantity + "] " + element.name);
            if (element.note) {
                printer.println("N: " + element.note);
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
        handleHttp(res, "ERROR_REGISTER_AUTH" + error);
    }
};

const isConnectedPrint = async ({ body }: Request, res: Response) => {
    try {
        const configPrinter: PrinterConfig = body.configPrinter


        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });
        let isConnected = false
        for (let i = 0; i < 4; i++) {
            isConnected = await printer.isPrinterConnected();
            // console.log(`Ejecución ${i + 1}: La impresora está ${isConnected ? 'conectada' : 'desconectada'}`);
            if (isConnected) break
            await waitExcecute(350);
        }
        // let isConnected = await printer.isPrinterConnected();
        if (!isConnected) return res.status(500).send({ status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." })

        return res.status(200).send({ status: true, msg: "Impresora con ip: " + configPrinter.ip + " conectada." })

    } catch (error) {
        handleHttp(res, "ERROR_REGISTER_AUTH");
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

export { printCtrl, isConnectedServer, isConnectedPrint };
