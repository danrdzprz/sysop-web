import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(1),
    questions:z.array(
        z.object({
            id:  z.string(),
            title: z.string(),
            description: z.string(),
            type:  z.string(),
            value: z.number(),
            question_number: z.number(),
            required: z.boolean(),
            jumps: z.array(
                z.object({
                    go_to:z.string(),
                    in_answer:z.string()
                })
            ).optional(),
            labels: z.object({
                prepend: z.string(),
                append: z.string()
            }).optional(),
            unit: z.string().nullable().optional(),
            invert: z.boolean(),
            preset_options: z.object({
                not_apply: z.boolean().optional(),
                other: z.boolean().optional()
            }).optional(),
            options: z.array(
                z.object({
                    option:z.string(),
                    value:z.number()
                })).optional(),
        })
        .refine((scheme) => (scheme.type !== 'number' || scheme.unit), {
            message: "El unidad es requerida cuando el tipo de pregunta es numerica",
            path: ["unidad"], // path of error
        })
        .refine((scheme) => (scheme.type !== 'multi' || scheme.options?.length), {
            message: "Debe existir al menos una opción",
            path: ["titulo"], // path of error
        })
    ).min(1)
});


export const ResolverSurveySchema = () =>{
    return toTypedSchema(RecordSchema);
} 