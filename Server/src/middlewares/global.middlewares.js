import mongoose from "mongoose"
import { findByIdRepository } from "../repository/user.repository.js"

const validId = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Id não existe!" })
        }

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const validUser = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await findByIdRepository(id)
        
        if (!user) {
            return res.status(400).send({ message: "Usuário não existe!" })
        }

        req.id = id
        req.user = user

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { validId, validUser }