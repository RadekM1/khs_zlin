import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, { message: "Heslo musí mít alespoň 8 znaků." })
  .regex(/(?=.*[A-Z])/, { message: "Heslo musí obsahovat alespoň jedno velké písmeno." })
  .regex(/(?=.*\d)/, { message: "Heslo musí obsahovat alespoň jedno číslo." })



export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return true;  
  } catch (e) {
    return false;  
  }
};