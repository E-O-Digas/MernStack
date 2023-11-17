import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { findByIdRepository } from '../repository/user.repository.js'
dotenv.config()

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401)
        }

        const parts = authorization.split(" ")

        if (parts.length !== 2) {
            return res.status(401)
        }

        const [schema, token] = parts

        if (schema != "Bearer") {
            return res.status(401).send({ message: "Não autorizado!" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ message: "Não Autorizado" })

            const user = await findByIdRepository(decoded.id)

            console.log(user)

            if (!user || !user.id) {
                return res.status(401).send({ message: "Não Autorizado" })
            }

            req.userId = user.id

            next()
        })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

export { authMiddleware }