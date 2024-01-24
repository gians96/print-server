import { Request, Response } from "express";
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
        // const response = await registerNewUser(body);

        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://192.168.1.166'

        });

        printer.alignCenter();


        const header = [
            {
                text: "CANT",
                style: { fontSize: 7, bold: true, alignment: "center" },
                alignment: "left"
            },
            {
                text: "DESCRIPCION",
                style: { fontSize: 7, bold: true, alignment: "center" }
            },
            {
                text: "P.UNI",
                style: { fontSize: 7, bold: true, alignment: "center" }
            },
            { text: "TOTAL", style: { fontSize: 7, bold: true, alignment: "center" } }
        ];

        const variableReactiva = "PRECUENTA";

        const printProductsOfTable = [
            header,
            ...products.map(product => {
                const cantidadXprecio = product.quantity * product.price;
                return [
                    {
                        text: product.quantity.toString(),
                        style: { fontSize: 7, alignment: "center" }
                    },
                    { text: product.name, style: { fontSize: 7, alignment: "left" } },
                    {
                        text: product.price.toString(),
                        style: { fontSize: 7, bold: true, alignment: "center" }
                    },
                    {
                        text: cantidadXprecio.toString(),
                        style: { fontSize: 7, bold: true, alignment: "center" }
                    }
                ];
            })
        ];

        const pdfMake = require("pdfmake/build/pdfmake");

        const pdfDocGenerator = pdfMake.createPdf({
            pageSize: {
                width: 232.598,
                height: "auto"
            },
            pageMargins: [4, 20, 4, 10],
            content: [
                {
                    text: variableReactiva,
                    style: { fontSize: 15, bold: true, alignment: "center" },
                    margin: [0, 0, 0, 5]
                },
                {
                    text: "AMBIENTE: ",
                    style: { fontSize: 7, bold: true, alignment: "left" },
                    margin: [0, 0, 0, 5]
                },
                {
                    text: "MESA: ",
                    style: { fontSize: 7, bold: true, alignment: "left" },
                    margin: [0, 0, 0, 5]
                },
                {
                    text: "MOZO: ",
                    style: { fontSize: 7, bold: true, alignment: "left" },
                    margin: [0, 0, 0, 5]
                },
                {
                    text: `FECHA: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
                    margin: [0, 0, 0, 5],
                    style: { fontSize: 7, bold: true, alignment: "left" }
                },
                {
                    layout: "custom",
                    table: {
                        heights: 1,
                        // widths: "*",
                        alignment: "center",
                        body: printProductsOfTable
                    }
                },
                {
                    text: `TOTAL: S/.100.00`,
                    margin: [0, 0, 6, 10],
                    style: { fontSize: 10, bold: true, alignment: "right" }
                },
                {
                    text: `DNI/RUC: `,
                    margin: [0, 0, 0, 15],
                    style: { fontSize: 8, bold: true, alignment: "left" }
                },
                {
                    text: `NOMBRES/RAZON SOCIAL:`,
                    margin: [0, 0, 0, 3],
                    style: { fontSize: 8, bold: true, alignment: "left" }
                },
                ,
                {
                    text: ` `,
                    margin: [0, 0, 0, 0],
                    style: { fontSize: 8, bold: true, alignment: "left" }
                }
            ]
        });

        try {
            printer.setBuffer(pdfDocGenerator.getBuffer());
            printer.println("Hello world: gians96@");
            printer.leftRight("Left", "Right"); // Prints text left and right
            printer.table(["One", "Two", "Three"]);
            printer.tableCustom(
                [
                    // Prints table with custom settings (text, align, width, cols, bold)
                    { text: "Left", align: "LEFT", width: 0.5 },
                    { text: "Center", align: "CENTER", width: 0.25, bold: true },
                    { text: "Right", align: "RIGHT", cols: 8 }
                ],
                [
                    // Prints table with custom settings (text, align, width, cols, bold)
                    { text: "Left", align: "LEFT", width: 0.5 },
                    { text: "Center", align: "CENTER", width: 0.25, bold: true },
                    { text: "Right", align: "RIGHT", cols: 8 }
                ]
            );
            // await printer.printImage("./assets/olaii-logo-black.png");
            printer.cut();

            let execute = printer.execute();
            console.log("Print done!");
        } catch (error) {
            console.error("Print failed:", error);
        }

        res.status(200).send("echo");
    } catch (error) {
        handleHttp(res, "ERROR_REGISTER_AUTH");
    }
}
const printTest1Ctrl = async ({ body }: Request, res: Response) => {
    try {
        const configPrinter: PrinterConfig = body.configPrinter


        const ThermalPrinter = require("node-thermal-printer").printer;
        const PrinterTypes = require("node-thermal-printer").types;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://' + configPrinter.ip
        });

        let isConnected = await printer.isPrinterConnected();
        if (!isConnected) return res.status(500).send({ status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." })
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
            res.status(200).send("yeaaah")
        } catch (error) {
            console.error("Print failed:", error);
        }
    } catch (error) {
        handleHttp(res, "ERROR_REGISTER_AUTH");
    }
};

const printTest2Ctrl = async ({ body }: Request, res: Response) => {

};
// const loginCtrl = async ({ body }: Request, res: Response) => {
//     try {
//         const { email, password } = body;
//         const response = await loginUser({ email, password });
//         if (response === "PASSWORD_INCORRECT")
//             return res.status(403).send(response);

//         res.status(200).send(response);
//     } catch (error) {
//         handleHttp(res, "ERROR_LOGIN_AUTH");
//     }
// };

export { printCtrl, printTest1Ctrl, printTest2Ctrl };
