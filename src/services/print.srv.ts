import { Printer } from "../interfaces/PrinterConfig.interface";
import { Table } from "../interfaces/Table.interface";
function waitExcecute(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const isConnectedPrintSrv = async (configPrinter: Printer) => {
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
    if (!isConnected) { return { status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." } }

    return { status: true, msg: "Impresora con ip: " + configPrinter.ip + " conectada." }
}
const printCommandSrv = async (configPrinter: Printer, table: Table) => {
    try {
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
        if (!isConnected) { return { status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." } }

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
                { text: table.waiter ? (table.waiter.name ? table.waiter.name : '') : '', align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "MESA:", align: "LEFT", width: 0.25 },
                { text: table.label, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.tableCustom(
            [
                { text: "PREPARA:", align: "LEFT", width: 0.25 },
                { text: table.tag.name, align: "LEFT", width: 0.25, bold: true },
            ]);
        printer.setTextNormal();

        printer.drawLine();
        printer.alignLeft();
        // printer.setTypeFontB();

        // printer.setTextNormal();


        table.products.forEach((product, index) => {
            printer.setTextSize(1, 1);  //(ANCHO,ALTO)

            // printer.println((index + 1) + ") [" + product.quantity + "] " + product.name);
            printer.println("[" + product.quantity + "] " + product.name);
            if (product.note) {
                printer.println("N: " + product.note);
            }
            // printer.newLine();
            printer.setTextNormal();
            printer.drawLine();

        });
        printer.cut();

        let execute = printer.execute()
        return { status: true, msg: "Impresión exitosa comanda" }
    } catch (error) {
        return { status: false, msg: "Error al imprimir: " + error }
    }
}
const printPreAccountSrv = async (configPrinter: Printer, table: Table) => {
    try {

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
        printer.setTextDoubleHeight();
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
                { text: table.waiter ? (table.waiter.name ? table.waiter.name : '') : '', align: "LEFT", width: 0.25, bold: true },
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
        if (!isConnected) { return { status: false, msg: "Impresora con ip: " + configPrinter.ip + " no encontrada." } }
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
            // printer.drawLine();
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

        let execute = printer.execute()
        return { status: true, msg: "Impresion de precuenta exitosa" }
    } catch (error) {
        return { status: false, msg: "Error al imprimir la precuenta: " + error }
    }
}

export { isConnectedPrintSrv, printCommandSrv, printPreAccountSrv }