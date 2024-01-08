import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(1),
    departament_id: z.number(),
    min_age_required: z.string().min(1),
    max_age_required: z.string().min(1),
    education: z.string().min(1),
    genere: z.string().min(1),
    driving_license: z.boolean(),
    activities: z.optional(z.string().optional()),
    additional_requirements: z.optional(z.string().optional()),
    business_days: z.array(z.string().min(1)),
    days_off: z.array(z.string().min(1)),
});


export const ResolverPositionSchema = () =>{
    return toTypedSchema(RecordSchema);
} 