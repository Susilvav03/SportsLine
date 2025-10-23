import { type Response, type NextFunction } from "express"
import { type AuthRequest } from "./auth.middleware.ts"

// Middleware to authorize based on user roles
const authorize = (...allowedRoles: string[]) => {
    return (req:AuthRequest, res:Response, next:NextFunction) => {
        if(!req.user){
            return res.status(401).json({error:"Unauthorized"})
        }
        if(!req.user.rol || !allowedRoles.includes(req.user.rol)){
            return res.status(403).json({error: "Forbidden: insufficient role"});
        }
        next()
    };
};

export default authorize