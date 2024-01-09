import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(1),
    role_id: z.number(),
    email: z.string().email(),
    phone: z.string().min(10).max(10).or(z.number()),
    birthdate: z.string().min(1),
});


export const ResolverEmployeeUpdateSchema = () =>{
    return toTypedSchema(RecordSchema);
} 