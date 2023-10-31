import { Router } from "express"
import { create, findAll, findById, updUserInfo } from "../controllers/user.controller.js"
import { validUser, validId } from "../middlewares/global.middlewares.js"

const router = Router()

router.post("/", create)

router.get("/", findAll)
router.get("/:id", validId, validUser, findById)

router.patch("/:id", validId, validUser, updUserInfo)

export default router