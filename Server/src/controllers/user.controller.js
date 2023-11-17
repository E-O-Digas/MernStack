import {
    createService,
    findAllService,
    updUserInfoService
} from "../services/user.services.js"

const create = async (req, res) => {
    const body = req.body
    try {
        const user = await createService(body)

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await findAllService()
        return res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const findById = async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updUserInfo = async (req, res) => {
    try {
        const { id, user } = req

        const { name, username, email, password, background, avatar } = req.body

        await updUserInfoService(
            id,
            user
        )

        res.status(200).send({ message: "Usuário atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { create, findAll, findById, updUserInfo }