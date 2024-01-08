import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(1),
});


export const ResolverDepartmentSchema = () =>{
    return toTypedSchema(RecordSchema);
} 