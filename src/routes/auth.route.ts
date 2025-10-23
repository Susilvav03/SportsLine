import { Router } from "express"
import { register, login } from "../controllers/auth.controller.ts"
import { validateBody } from "../middlewares/validate.middleware.ts"
import { 
    UserRegisterSchema, 
    UserLoginSchema } from "../schemas/user.schema.ts"

const router: Router = Router()

router.post("/register", validateBody(UserRegisterSchema), register)
router.post("/login", validateBody(UserLoginSchema), login)

export default router
