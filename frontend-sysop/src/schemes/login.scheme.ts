import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});


export const ResolverLoginSchema = () =>{
    return toTypedSchema(RecordSchema);
} 