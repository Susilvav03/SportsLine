import authRouter from "./auth.route.ts"
import { Router } from "express"

const router: Router = Router()

router.post("/auth", authRouter)

export default router

