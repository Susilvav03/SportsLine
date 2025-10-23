import authRouter from "./auth.route.ts"
import customerRouter from "./customers.route.ts"
import ordersRouter from "./orders.route.ts"
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { Router } from "express"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/customers", requireAuth, customerRouter)
router.use("/orders", requireAuth, ordersRouter)

export default router
