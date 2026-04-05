import mongoose from "mongoose";
import { User } from "../models/userModel";
import { Request, Response } from "express";

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        if (users.length == 0) {
            return res.status(404).json({ message: "No users found." })
        }
        res.json({ message: "Users fetched successfully", users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }

}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(req.params.id).select("-password");
        if (!user ) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User fetched successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {        
        const update = req.body;
        const id = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.json({ message: "User updated successfully", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


export const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;
        if (isActive === undefined) {
            return res.status(400).json({ message: "isActive field not provided." })
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}