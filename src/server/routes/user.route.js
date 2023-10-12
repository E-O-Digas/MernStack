import express from "express"
import { create, findAll, findById, updUserInfo } from "../controllers/user.controller.js"
import { validUser, validId } from "../middlewares/global.middlewares.js"

const Router= express.Router() 

Router.post("/", create)
Router.get("/", findAll)
Router.get("/:id", validId, validUser, findById)
Router.patch("/:id", validId, validUser, updUserInfo)

export default Router