import authRouter from "./auth.route.ts"
import customerRouter from "./customers.route.ts"
import ordersRouter from "./orders.route.ts"
import { Router } from "express"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/customers", customerRouter)
router.use("/orders", ordersRouter)

export default router
