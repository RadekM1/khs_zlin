import { z } from 'zod';

const nameSchema = z.string()
  .min(2, { message: "Jméno musí mít alespoň dva znaky." }) 
  .max(50, { message: "Jméno nesmí přesahovat 50 znaků." }) 
  .regex(/^[A-Za-zÁÉÍÓÚÝČĎĚŇŘŠŤŽáéíóúýčďěňřšťž\s'-]+$/, { message: "Jméno může obsahovat pouze písmena, pomlčku nebo apostrof." }) 
  .regex(/^[^\s-'][A-Za-zÁÉÍÓÚÝČĎĚŇŘŠŤŽáéíóúýčďěňřšťž\s'-]*[^\s-']$/, { message: "Jméno nesmí začínat nebo končit mezerou, pomlčkou nebo apostrofem." }) 
  .regex(/^(?!.*\s{2,}).*$/, { message: "Jméno nesmí obsahovat více mezer za sebou." }) 

  export const validateName = (name) => {
    try {
      nameSchema.parse(name);
      return { valid: true, error: null };
    } catch (e) {
     
      return { valid: false, error: e.errors[0].message };
    }
  };