const userController= require("../controllers/user.controller")
const route= require("express").Router()

route.get("/user", userController.userInfo)

module.exports= route 