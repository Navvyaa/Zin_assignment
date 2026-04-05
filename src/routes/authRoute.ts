import { userRegisterSchema,userLoginSchema } from "../validators/userValidator";
import express  from "express";
import { validateSchema } from "../middleware/validateSchema";
import { registerUser,loginUser } from "../controllers/authController";

const router=express.Router();

router.post("/register",validateSchema(userRegisterSchema),registerUser);
router.post("/login",validateSchema(userLoginSchema),loginUser);

export default router;