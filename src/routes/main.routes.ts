import authRouter from "./auth.route.ts"
import customerRouter from "./customers.route.ts"
import { Router } from "express"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/customers", customerRouter)

export default router
