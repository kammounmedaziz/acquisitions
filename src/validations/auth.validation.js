import { z} from 'zod';

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(256),
  email: z.string().toLowerCase().email('Invalid email address').max(256).trim(), 
  password: z.string().min(6).max(128),
  role: z.enum(['user', 'admin']).default('user')
});


export const signinSchema = z.object({
  email: z.string().toLowerCase().trim(), 
  password: z.string().min(6).max(128),
}); 




export const jwtPayloadSchema = z.object({
  userId: z.number().int().positive(),
  email: z.string().toLowerCase().email('Invalid email address').max(256).trim(),
  role: z.enum(['user', 'admin'])
});