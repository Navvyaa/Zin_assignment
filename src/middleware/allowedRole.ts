import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const allowRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden: insufficient permissions"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };
};