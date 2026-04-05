import express, { Router } from "express";
import { getAllUsers, getUserById, deleteUser, updateUser, updateUserStatus } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/allowedRole";

const router = express.Router();

router.get("/",authMiddleware,allowRoles("admin"),getAllUsers)
router.get("/:id",authMiddleware,allowRoles("admin"),getUserById);
router.patch("/:id",authMiddleware,allowRoles("admin"),updateUser);
router.patch("/status/:id",authMiddleware,allowRoles("admin"),updateUserStatus);
router.delete("/:id",authMiddleware,allowRoles("admin"),deleteUser);

export default router;
