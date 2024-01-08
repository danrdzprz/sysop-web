import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const ResolverAuthSchema = zodResolver(RecordSchema);