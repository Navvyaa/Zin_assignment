import { userRegisterSchema,userLoginSchema } from "../validators/user.validators";
import express  from "express";
import { validate } from "../middleware/validate";
import { registerUser,loginUser } from "../controllers/auth.controller";

const router=express.Router();

router.post("/register",validate(userRegisterSchema),registerUser);
router.post("/login",validate(userLoginSchema),loginUser);
