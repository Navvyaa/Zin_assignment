import { User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(400).json({ message: "User already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name: name,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User created successfully",
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            id: user._id
        })

    } catch (error) {
        return res.json({ message: "Server Error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }
        if (!user.isActive) {
            return res.status(403).json({ message: "User is inactive." })
        }
        const token = await generateToken(email, user._id.toString());
        return res.json({ message: "Login Successful", token: token })

    } catch (error) {
        return res.json({ message: "Server Error" })
    }
}