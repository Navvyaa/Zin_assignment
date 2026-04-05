import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const formattedError = error.issues.map((err) => ({
                    field:err.path.join('.'),
                    message: err.message
                }))
                return res.status(400).json({
                    error: formattedError
                })
            }
            console.log(error);
            return res.status(500).json({message:"Server error"})

        }
    }
}

