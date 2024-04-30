import { z } from 'zod';
export const SignUpBody=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})
export const SignInBody=z.object({
    email:z.string().email(),
    password:z.string().min(6)

})
export const BlogBody=z.object({
    title:z.string().max(100),
    content:z.string()
})
export const UpdateBlogBody=z.object({
    id:z.number(),
    title:z.string(),
    content:z.string()
})
export type BlogValidation=z.infer<typeof BlogBody>;
export type UpdateBlogValidation=z.infer<typeof UpdateBlogBody>;
export type SignInvalidation=z.infer<typeof SignInBody>;
export type SignUpvalidation=z.infer<typeof SignUpBody>;