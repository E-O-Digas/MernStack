const userController= require("../controllers/user.controller")
const route= require("express").Router()

route.post("/user", userController.create)

module.exports= route 