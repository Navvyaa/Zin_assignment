import { z } from "zod";


export const userRegisterSchema=z.object({
    name:z.string().trim().min(2,"Name should be of atleast 2 characters"),
    email:z.string().trim().email("Invalid Email Format"),
    password:z.string().trim().min(6,"Password must be of atleast 6 characters")
})

export const userLoginSchema=z.object({
    email:z.string().trim().email("Invalid Email Format"),
    password:z.string().trim().min(6,"Invalid Credentials")
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.enum(["admin", "analyst", "viewer"]).optional()
});

export const updateStatusSchema = z.object({
  isActive: z.boolean()
});