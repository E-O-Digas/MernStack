import User from "../models/User.js"

const createRepository = (body) => User.create(body)

const findAllRepository = () => User.find()

const findByIdRepository = (id) => User.findById(id)

const updUserInfoRepository = (id, body) =>
    User.findOneAndUpdate(
        { _id: id },
        { body }
    )

export { createRepository, findAllRepository, findByIdRepository, updUserInfoRepository }