import zod from 'zod';

export const signupSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6),
    name:zod.string().optional()
})

export const signinSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6),
})

export const createBlogSchema = zod.object({
    title : zod.string().min(3),
    content : zod.string().min(6),
})

export const updateBlogSchema = zod.object({
    title : zod.string().min(3),
    content : zod.string().min(6),
    id:zod.number()
})

export type signupType = zod.infer<typeof signupSchema>
export type signinType = zod.infer<typeof signinSchema>
export type createBlogType = zod.infer<typeof createBlogSchema>
export type updateBlogType = zod.infer<typeof updateBlogSchema>