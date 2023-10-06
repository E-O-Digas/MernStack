const User= require("../models/User")

const createServices= (body) => User.create(body)

const findAllServices= () => User.find()

const findByIdServices= (id) => User.findById(id)

module.exports= { createServices, findAllServices, findByIdServices }