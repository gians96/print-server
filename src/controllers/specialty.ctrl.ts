import { Request, Response } from "express";
import "dotenv/config";
import {
  // registerSpeciality,
  getListSpeciality,
  getSpeciality,
  deleteSpeciality
} from "../services/speciality.srv";
import { handleHttp } from "../utils/error.handle";

// const registerSpecialityCtrl = async ({ body }: Request, res: Response) => {
//   try {
//     const response = await registerSpeciality(body);
//     if (!response) {
//       return res.status(409).send({ msg: "El nombre ya esta siendo usado" });
//     }
//     res.status(200).send(response);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const getListSpecialityCtrl = async ({ body }: Request, res: Response) => {
  const database = process.env.DATABASE_URL;
  try {
    const response = await getListSpeciality();
    res.status(200).send({ response, database });
  } catch (error) {
    res.status(500).send({ error, database });
  }
};

const getSpecialityCtrl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getSpeciality(parseInt(id));
    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteSpecialityCtrl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteSpeciality(parseInt(id));
    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  // registerSpecialityCtrl,
  getListSpecialityCtrl,
  getSpecialityCtrl,
  deleteSpecialityCtrl
};
