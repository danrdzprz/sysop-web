import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const dateSchema = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date());

export const RecordSchema = z.object({
    name: z.string().min(1),
    role_id: z.number(),
    email: z.string().email(),
    phone: z.string().min(10).max(10).or(z.number()),
    birthdate: z.string().regex( /\d{4}-[01]\d-[0-3]\d/ ),
    password: z.string().min(1),
    password_confirmation: z.string().min(1),
});


export const ResolverEmployeeSchema = () =>{
    return toTypedSchema(RecordSchema);
} 