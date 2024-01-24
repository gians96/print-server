import { PrismaClient } from "@prisma/client";
import { Specialty } from "../interfaces/speciality.interface";
const prisma = new PrismaClient();
// const registerSpeciality = async ({
//   name,
//   description,
//   category,
//   price,
//   type_commission,
//   commission,
//   status
// }: Specialty) => {
//   const existSpeciality = await getSpecialityName(name);
//   if (existSpeciality?.name) {
//     return null;
//   }
//   const response = await prisma.specialty.create({
//     data: {
//       name,
//       description,
//       category,
//       price,
//       type_commission,
//       commission,
//       status
//     }
//   });

//   return response;
// };

const getListSpeciality = async () => {
  const response = await prisma.specialty.findMany();
  return response;
};

const getSpeciality = async (id: number) => {
  const response = await prisma.specialty.findFirst({
    where: {
      id
    }
  });
  return response;
};

const getSpecialityName = async (name: string) => {
  const response = await prisma.specialty.findFirst({
    where: {
      name
    }
  });
  return response;
};

const deleteSpeciality = async (id: number) => {
  const response = await prisma.specialty.delete({
    where: {
      id
    }
  });
  return response;
};
export {
  // registerSpeciality,
  getListSpeciality,
  getSpeciality,
  deleteSpeciality
};
