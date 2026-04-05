import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

export type Role = "admin" | "analyst" | "viewer";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type:String,
            enum:["admin","viewer","analyst"],
            default:"viewer",
        },
        isActive: {
            type:Boolean,
            default:true,
        },
        password: {
            type:String,
            required:true,
            trim:true
        }},{
            timestamps:true
        }
)

export const User = mongoose.model<IUser>("User", userSchema)