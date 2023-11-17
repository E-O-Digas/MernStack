import { Router } from "express"
import { create, findAll, findById, updUserInfo } from "../controllers/user.controller.js"
import { validUser, validId } from "../middlewares/global.middlewares.js"

const userRouter = Router()

userRouter.post("/", create)

userRouter.get("/", findAll)
userRouter.get("/:id", validId, validUser, findById)

userRouter.patch("/:id", validId, validUser, updUserInfo)

export default userRouter