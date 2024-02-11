import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "dotenv/config";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

//cuando tenemos id
// const unsub = onSnapshot(doc(db, "domain-client-printer", "*"), (doc) => {
//   console.log("Current data: ", doc.data());
// });

import { collection, query, where, setDoc } from "firebase/firestore";
import { Queue } from "./interfaces/Table.interface";
import {
  isConnectedPrintSrv,
  printCommandSrv,
  printPreAccountSrv,
} from "./services/print.srv";
import { ConfigPrinter, Printer } from "./interfaces/PrinterConfig.interface";

let url = process.env.url || "";
interface ResponseService {
  status: boolean;
  msg: string;
}
let clientPrinterResponse: ConfigPrinter | undefined;
const restaurantDocRef = doc(collection(db, "domain-client-printer"), url);
onSnapshot(restaurantDocRef, async (docSnapshot) => {
  // Aquí puedes manejar los datos del documento en tiempo real
  if (docSnapshot.exists()) {
    clientPrinterResponse = await docSnapshot.data() as ConfigPrinter;
  }
});

function waitExcecute(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
setInterval(async () => {
  // const result = await isConnectedPrintSrv(configPrinter);
  if (!clientPrinterResponse?.printers) {
    return;
  }
  let isChangeValue = false;

  //CONECTIVIDAD DE LA PRECUENTA
  let isResponseConnectPreAccount = await isConnectedPrintSrv(clientPrinterResponse?.printerPreAccount);
  // await waitExcecute(300)
  // console.log({ fire: clientPrinterResponse.printerPreAccount.isConnect, serv: isResponseConnectPreAccount.status });
  if (clientPrinterResponse.printerPreAccount.isConnect !== isResponseConnectPreAccount.status) {
    isChangeValue = true;
    // console.log({ fireif: clientPrinterResponse.printerPreAccount.isConnect, servif: isResponseConnectPreAccount.status });
    clientPrinterResponse.printerPreAccount.isConnect = isResponseConnectPreAccount.status
  }

  //PARA SABER LA CONECTIVDAD DE LAS IMPRESORAS
  for (let index = 0; index < clientPrinterResponse?.printers.length; index++) {
    let isResponse = await isConnectedPrintSrv(clientPrinterResponse?.printers[index]);
    // console.log({ fireif: clientPrinterResponse.printers[index].isConnect, servif: isResponse.status });

    if (clientPrinterResponse.printers[index].isConnect !== isResponse.status) {
      isChangeValue = true;
      clientPrinterResponse.printers[index].isConnect = isResponse.status
    }
  }//for

  if (isChangeValue) {
    console.log("Hubo un cambio");
    // await waitExcecute(500)
    await setDoc(
      doc(db, "domain-client-printer", url),
      clientPrinterResponse
    );
    await waitExcecute(150)//Si no se ponia esto, se hacian dos peticiones, por cambiar el estado.
  }
  // }, 1000 * 60 * 5); // Ejecutar cada 5 minutos
}, 5000); // Ejecutar cada 5 minutos

const q = query(
  collection(db, "print-queue", url, "queue"),
  where("isPrinted", "==", false)
);
const unsubscribe = onSnapshot(
  q,
  (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      // console.log(doc.data());
      let queue = doc.data() as Queue;
      let res;
      if (queue.typePrinted === "command") {
        res = await printCommandSrv(queue.configPrinter, queue.table);
      }
      if (queue.typePrinted === "preaccount") {
        res = await printPreAccountSrv(queue.configPrinter, queue.table);
      }
      if (res?.status) {
        updateDoc(doc.ref, { isPrinted: true });
      }
    });
  },
  (error) => {
    console.error("Error al escuchar cambios en Firestore:", error);
  }
);

// NEW CODE A PROBAR
//   const q = query(collection(db, "print-queue", url, "queue"), where("isPrinted", "==", false));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     // Procesar la impresión
//     imprimirDocumento(doc.data());

//     // Marcar el documento como impreso
//     updateDoc(doc.ref, { isPrinted: true });
//   });
// },
// (error) => {
//   console.error('Error al escuchar cambios en Firestore:', error);
// });
