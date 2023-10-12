const User = require("../models/User")

const createServices = (body) => User.create(body)

const findAllServices = () => User.find()

const findByIdServices = (id) => User.findById(id)

const updUserInfoServices = (id, name, username, email, password, image, background, avatar) => 
    User.findOneAndUpdate(
        { _id: id }, 
        { name, username, email, password, image, background, avatar }
    )

module.exports = { createServices, findAllServices, findByIdServices, updUserInfoServices }