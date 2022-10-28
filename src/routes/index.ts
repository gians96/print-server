import { Router } from "express";
import { readdirSync } from "fs"; //paquete para leer directorios

const PATH_ROUTER = `${__dirname}`; //Directorio actual
const router = Router();

const cleanFileName = (fileName: String) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      //console.log(`Se esta cargando la ruta ... /${cleanName}`);
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});
export { router };
