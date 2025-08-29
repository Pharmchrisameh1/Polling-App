import { z } from 'zod'


export const authSchema = z.object({
email: z.string().email('Enter a valid email'),
password: z.string().min(6, 'Minimum 6 characters')
})


export type AuthFormValues = z.infer<typeof authSchema>
