import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    title: z.string().min(1),
    text: z.string().min(1),
});


export const ResolverPostSchema = () =>{
    return toTypedSchema(RecordSchema);
} 